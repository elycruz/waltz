export class Digraph {
    declare private _adjLists: number[][];
    declare private _edgeCount: number;
    declare private _inDegree: number[];

    /**
     * Parses graph format file into a directed graph representation.
     */
    static fromLines(lines: string[]): Digraph {
        const vertCount = parseInt(lines[0]);
        const digraph = new Digraph(vertCount);
        for (let i = 2; i < lines.length; i++) {
            const [v, w] = lines[i].split(/\s+/).map(Number);
            digraph.addEdge(v, w);
        }
        return digraph;
    }

    constructor(vertCount: number) {
        this._adjLists = Array.from({ length: vertCount }, () => []);
        this._inDegree = Array(vertCount).fill(0);
        this._edgeCount = 0;
    }

    vertCount(): number {
        return this._adjLists.length;
    }

    edgeCount(): number {
        return this._edgeCount;
    }

    adj(v: number): number[] {
        this.validateVertex(v);
        return this._adjLists[v];
    }

    outdegree(v: number): number {
        this.validateVertex(v);
        return this._adjLists[v].length;
    }

    indegree(v: number): number {
        this.validateVertex(v);
        return this._inDegree[v];
    }

    addVertex(v: number): number {
        while (v >= this._adjLists.length) {
            this._adjLists.push([]);
            this._inDegree.push(0);
        }
        return v;
    }

    addEdge(v: number, w: number): void {
        this.validateVertex(v);
        this.validateVertex(w);
        this._adjLists[v].push(w);
        this._adjLists[v].sort((a, b) => a - b);
        this._edgeCount += 1;
        this._inDegree[w] += 1;
    }

    validateVertex(v: number): void {
        if (v >= this._adjLists.length) {
            throw new Error(`Vertex ${v} is out of index range 0-${this._adjLists.length - 1}`);
        }
    }

    reverse(): Digraph {
        const vCount = this.vertCount();
        const out = new Digraph(vCount);
        for (let v = 0; v < vCount; v++) {
            for (const w of this._adjLists[v]) {
                out.addEdge(w, v);
            }
        }
        return out;
    }
}