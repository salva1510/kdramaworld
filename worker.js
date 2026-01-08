export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Get query params
    const title = url.searchParams.get("t");
    const imdb = url.searchParams.get("i");
    const search = url.searchParams.get("s");
    const type = url.searchParams.get("type") || "series";

    if (!title && !imdb && !search) {
      return new Response(
        JSON.stringify({ error: "Missing query parameter" }),
        { status: 400 }
      );
    }

    let omdbUrl = `https://www.omdbapi.com/?apikey=${env.OMDB_API_KEY}`;

    if (title) omdbUrl += `&t=${encodeURIComponent(title)}`;
    if (imdb) omdbUrl += `&i=${encodeURIComponent(imdb)}`;
    if (search) omdbUrl += `&s=${encodeURIComponent(search)}`;
    if (type) omdbUrl += `&type=${type}`;
    omdbUrl += `&plot=full`;

    const response = await fetch(omdbUrl, {
      cf: { cacheTtl: 86400 } // 1-day cache
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
