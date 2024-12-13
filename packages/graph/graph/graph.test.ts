import { assertEquals, assertThrows } from "jsr:@std/assert";
import { Graph } from "./graph.ts"; // Adjust the import path as necessary

Deno.test("Graph: constructor and vertCount", () => {
  const g = new Graph(3);
  assertEquals(g.vertCount(), 3);
  assertEquals(g.edgeCount(), 0);
});

Deno.test("Graph: addVertex", () => {
  const g = new Graph(2);
  g.addVertex(3);
  assertEquals(g.vertCount(), 4);
});

Deno.test("Graph: addEdge and adj", () => {
  const g = new Graph(3);
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  assertEquals(g.adj(0), [1, 2]);
  assertEquals(g.adj(1), [0]);
  assertEquals(g.adj(2), [0]);
  assertEquals(g.edgeCount(), 4);
});

Deno.test("Graph: degree", () => {
  const g = new Graph(3);
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  assertEquals(g.degree(0), 2);
  assertEquals(g.degree(1), 1);
  assertEquals(g.degree(2), 1);
});

Deno.test("Graph: validateVertex", () => {
  const g = new Graph(3);
  assertThrows(
    () => {
      g.validateVertex(4);
    },
    Error,
    "Vertex 4 is out of index range 0-2",
  );
});

Deno.test("Graph: removeVertex", () => {
  const g = new Graph(3);
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  g.removeVertex(0);
  assertEquals(g.vertCount(), 2);
  assertEquals(g.edgeCount(), 0);
  assertEquals(g.adj(0), []);
  assertEquals(g.adj(1), []);
});

Deno.test("Graph: removeEdge", () => {
  const g = new Graph(3);
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  g.removeEdge(0, 1);
  assertEquals(g.adj(0), [2]);
  assertEquals(g.adj(1), []);
  assertEquals(g.edgeCount(), 2);
});

Deno.test("Graph: fromLines", () => {
  const lines = [
    "3",
    "0 1",
    "0 2",
    "1 2",
  ];
  const g = Graph.fromLines(lines);
  assertEquals(g.vertCount(), 3);
  assertEquals(g.edgeCount(), 6);
  assertEquals(g.adj(0), [1, 2]);
  assertEquals(g.adj(1), [0, 2]);
  assertEquals(g.adj(2), [0, 1]);
});
