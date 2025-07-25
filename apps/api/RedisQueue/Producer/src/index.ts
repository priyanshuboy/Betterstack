import { createClient } from "redis";
import { prismaClient } from "store";

(async () => {
  const client = createClient();

  client.on("error", (err: Error) => console.log("Redis error", err));

  await client.connect();

  const website: { url: string; id: string }[] = await prismaClient.website.findMany({
    select: {
      id: true,
      Url: true
    }
  }).then(data =>
    data.map(w => ({
      id: w.id,
      url: w.Url
    }))
  );

  for (const site of website) {
    const res = await client.xAdd("betterstack:website", "*", {
      url: site.url,
      id: site.id
    });
    console.log("Stream ID:", res);
  }

  await client.quit();
})();
