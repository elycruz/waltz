import { assertEquals, assertThrows } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { Digraph } from "./digraph.ts"; // Adjust the import path as necessary

Deno.test("Digraph: constructor and vertCount", () => {
    const g = new Digraph(3);
    assertEquals(g.vertCount(), 3);
    assertEquals(g.edgeCount(), 0);
});

Deno.test("Digraph: addVertex", () => {
    const g = new Digraph(2);
    g.addVertex(3);
    assertEquals(g.vertCount(), 4);
});

Deno.test("Digraph: addEdge and adj", () => {
    const g = new Digraph(3);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    assertEquals(g.adj(0), [1, 2]);
    assertEquals(g.edgeCount(), 2);
});

Deno.test("Digraph: outdegree and indegree", () => {
    const g = new Digraph(3);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    assertEquals(g.outdegree(0), 2);
    assertEquals(g.indegree(1), 1);
    assertEquals(g.indegree(2), 1);
});

Deno.test("Digraph: validateVertex", () => {
    const g = new Digraph(3);
    assertThrows(() => {
        g.validateVertex(4);
    }, Error, "Vertex 4 is out of index range 0-2");
});

Deno.test("Digraph: reverse", () => {
    const g = new Digraph(3);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    const reversed = g.reverse();
    assertEquals(reversed.adj(1), [0]);
    assertEquals(reversed.adj(2), [0]);
    assertEquals(reversed.edgeCount(), 2);
    assertEquals(reversed.vertCount(), 3);
});

Deno.test("Digraph: fromLines", () => {
    const lines = [
        "3",
        "",
        "0 1",
        "0 2",
        "1 2"
    ];
    const g = Digraph.fromLines(lines);
    assertEquals(g.vertCount(), 3);
    assertEquals(g.edgeCount(), 3);
    assertEquals(g.adj(0), [1, 2]);
    assertEquals(g.adj(1), [2]);
});