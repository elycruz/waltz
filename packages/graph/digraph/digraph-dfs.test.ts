import { assertEquals, assertThrows } from "jsr:@std/assert";
import { Digraph } from "./digraph.ts";
import { DigraphDFS } from "./digraph-dfs.ts";

Deno.test("DigraphDFS: E2E with Digraph", () => {
  const vertCount = 5;
  const symGraph = new Digraph(vertCount);
  const symGraph2 = new Digraph(vertCount);
  const vLen = vertCount;
  const limit = vLen - 1;

  for (let i = 0; i < vLen; i++) {
    const edges = i < limit ? [i + 1] : [];
    const edges2 = i < limit
      ? Array.from({ length: limit - i }, (_, k) => i + 1 + k)
      : [];
    edges.forEach((e) => symGraph.addEdge(i, e));
    edges2.forEach((e) => symGraph2.addEdge(i, e));
  }

  assertEquals(
    symGraph.vertCount(),
    vertCount,
    "`#.vertCount` is invalid (1)",
  );
  assertEquals(
    symGraph.edgeCount(),
    vertCount - 1,
    "`#.edgeCount` is invalid (1)",
  );
  assertEquals(
    symGraph2.vertCount(),
    vertCount,
    "`#.vertCount` is invalid (2)",
  );
  assertEquals(
    symGraph2.edgeCount(),
    (vLen - 1) * vLen / 2,
    "`#.edgeCount` is invalid (2)",
  );

  for (let i = 0; i < vLen; i++) {
    const dfsRslt = new DigraphDFS(symGraph, i);
    const dfsRslt2 = new DigraphDFS(symGraph2, i);

    for (let j = i + 1; j < vLen; j++) {
      assertEquals(
        dfsRslt.marked(j),
        true,
        `vertex \`${j}\` not reachable from vertex \`${i}\` (1)`,
      );
      assertEquals(
        dfsRslt2.marked(j),
        true,
        `vertex \`${j}\` not reachable from vertex \`${i}\` (2)`,
      );
    }

    assertEquals(
      dfsRslt.countVertices(),
      vLen - i,
      `\`dfsRslt.count()\` should be equal to \`${vLen - i}\` (1)`,
    );
    assertEquals(
      dfsRslt2.countVertices(),
      vLen - i,
      `\`dfsRslt.count()\` should be equal to \`${vLen - i}\` (2)`,
    );

    assertThrows(() => dfsRslt.marked(99), Error, "99 is out of range");
    assertThrows(() => dfsRslt2.marked(99), Error, "99 is out of range");
  }
});
