import { Digraph } from "./digraph.ts";

interface DigraphDFSShape {
  marked(i: number): boolean;
}

function vertexMarked(marked: boolean[], i: number): boolean {
  if (i >= marked.length) {
    throw new Error(`${i} is out of range`);
  }
  return marked[i];
}

export class DigraphDFS implements DigraphDFSShape {
  declare private _marked: boolean[];
  declare private count: number;

  constructor(g: Digraph, sourceVertex: number) {
    this._marked = Array(g.vertCount()).fill(false);
    this.count = 0;
    this.dfs(g, sourceVertex);
  }

  private dfs(g: Digraph, v: number): void {
    g.validateVertex(v);
    this.count += 1;
    this._marked[v] = true;
    const adj = g.adj(v);
    for (const w of adj) {
      if (!this._marked[w]) {
        this.dfs(g, w);
      }
    }
  }

  countVertices(): number {
    return this.count;
  }

  marked(i: number): boolean {
    return vertexMarked(this._marked, i);
  }
}
