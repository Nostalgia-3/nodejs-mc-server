import * as varint from 'varint';

export enum Blocks {
    AIR
}

export class BlockState {
    protected id: number;
    protected metadata: number;

    constructor(id: number, metadata: number) {
        this.id = id;
        this.metadata = metadata;
    }

    getID() { return this.id; }
    getMetadata() { return this.metadata; }
    getValue() { return (this.id << 4) | this.metadata; }
}

export class Chunk {
    sections: ChunkSection[];

    constructor() {
        this.sections = [];

        for(let i=0;i<16;i++) {
            this.sections[i] = new ChunkSection();
        }
    }

    set(b: BlockState, x: number, y: number, z: number) {
        const localBlock = y%16;
        const section = y-(localBlock)/16;

        this.sections[section].set(b, x, localBlock, z);
    }

    getSection(n: number): ChunkSection {
        return this.sections[n];
    }

    getFilledSections(): number {
        let n = 0;

        for(let i=0;i<this.sections.length;i++) {
            if(!this.sections[i].isEmpty()) n |= (1 << i);
        }

        return n;
    }
}

export class ChunkSection {
    blocks: BlockState[];

    constructor() {
        this.blocks = [];

        for(let x=0;x<16;x++) {
            for(let y=0;y<16;y++) {
                for(let z=0;z<16;z++) {
                    this.set(new BlockState(0,0), x, y, z);
                }
            }
        }
    }

    set(b: BlockState, x: number, y: number, z: number) {
        this.blocks[y << 8 | z << 4 | x] = b;
    }

    get(x: number, y: number, z: number): BlockState {
        return this.blocks[(y & 0xf) << 8 | z << 4 | x];
    }

    isEmpty(): boolean {
        for(let i=0;i<this.blocks.length;i++) {
            if(this.blocks[i].getID() != Blocks.AIR) return false;
        }

        return true;
    }
}

export class Palette {
    blocks: BlockState[];

    constructor() {
        this.blocks = [];
    }

    addBlock(b: BlockState) {
        this.blocks.push(b);
    }

    get(b: BlockState) {
        for(let i=0;i<this.blocks.length;i++) {
            if(b.getID() == this.blocks[i].getID() && b.getMetadata() == this.blocks[i].getMetadata()) {
                return i;
            }
        }
    }
}

export function makePalette(pal: Palette) {
    let n: number[] = [];
    let j: number[] = [];

    // j = j.concat(Array.from(varint.encode(new BlockState(0, 0).getValue())));
    // j = j.concat(Array.from(varint.encode(new BlockState(1, 0).getValue())));
    
    for(let i=0;i<pal.blocks.length;i++) {
        j = j.concat(Array.from(varint.encode(pal.blocks[i].getValue())));
    }

    n = n.concat(Array.from(varint.encode(j.length)));
    n = n.concat(j);

    return n;
}

export function makeChunkSection(chunkSection: ChunkSection) {
    if(chunkSection.isEmpty()) { console.error(`Section is empty!`); return }
    const t = new Palette();

    t.addBlock(new BlockState(0, 0));
    t.addBlock(new BlockState(1, 0));

    let n: number[] = [];
    let b: Buffer = Buffer.alloc(16*16*16);

    n = n.concat(8);
    n = n.concat(makePalette(t));

    let offset = 0;

    for (let blockY = 0; blockY < 16; blockY++) {
        for (let blockZ = 0; blockZ < 16; blockZ++) {
            for (let blockX = 0; blockX < 16; blockX++) {
                let state = t.get(chunkSection.get(blockX, blockY, blockZ));

                b.writeUInt8(state, offset); offset++;
            }
        }
    }

    n = n.concat(b.length/4);
    n = n.concat(Array.from(b));

    for(let i=0;i<2048;i++) {
        n = n.concat(0xFF);
    }

    for(let i=0;i<2048;i++) {
        n = n.concat(0xFF);
    }

    return n;
}