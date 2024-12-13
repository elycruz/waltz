export class Graph {
    declare private _adjLists: number[][];
    declare private _edgeCount: number;

    constructor(vertCount: number) {
        this._adjLists = Array.from({ length: vertCount }, () => []);
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

    degree(v: number): number {
        return this.adj(v).length;
    }

    addVertex(v: number): number {
        let count = this._adjLists.length;
        while (v >= count++) {
            this._adjLists.push([]);
        }
        return v;
    }

    hasVertex(v: number): boolean {
        return v < this._adjLists.length;
    }

    removeVertex(v: number): void {
        this.validateVertex(v);
        const targetAdj = this.adj(v);

        targetAdj.forEach(w => {
            this.removeEdge(v, w);
            const wAdj = this._adjLists[w];
            const { length: len } = wAdj
            for (let i = 0; i < len; i++) {
                if (wAdj[i] >= v) {
                    wAdj[i]--;
                }
            }
        });

        this._adjLists.splice(v, 1);
    }

    addEdge(v: number, w: number): void {
        this.validateVertex(v);
        this.validateVertex(w);
        this._adjLists[v].push(w);
        this._adjLists[v].sort((a, b) => a - b);
        this._adjLists[w].push(v);
        this._adjLists[w].sort((a, b) => a - b);
        this._edgeCount += 2;
    }

    hasEdge(v: number, w: number): boolean {
        this.validateVertex(v);
        this.validateVertex(w);
        return this._adjLists[v].includes(w);
    }

    removeEdge(v: number, w: number): void {
        this.validateVertex(v);
        this.validateVertex(w);
        this._adjLists[v] = this._adjLists[v].filter(vertex => vertex !== w);
        this._adjLists[w] = this._adjLists[w].filter(vertex => vertex !== v);
        this._edgeCount -= 2;
    }

    validateVertex(v: number): void {
        if (v >= this._adjLists.length) {
            throw new Error(`Vertex ${v} is out of index range 0-${this._adjLists.length - 1}`);
        }
    }

    static fromLines(lines: string[]): Graph {
        const vertCount = parseInt(lines[0]);
        const graph = new Graph(vertCount);

        for (let i = 1; i < lines.length; i++) {
            const [v, w] = lines[i].split(/\s+/).map(Number);
            graph.addEdge(v, w);
        }

        return graph;
    }
}