function Home() {
  return (
    <main>
      <h1>HOME</h1>
      <div>
        <img
          height="300"
          width="500"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL4_fVP8jLre3D4I3jh-B5nG8a8BVdjW4pZw&usqp=CAU"
          alt="jiu jitsu cartoon"
        />
        <div>
          Photo by <a href="AUTHOR_LINK">Brenda Godinez</a> on{" "}
          <a href="UNSPLASH_LINK">Unsplash</a>
        </div>
      </div>
      <a href="/places">
        <button className="btn-primary">Places Page</button>
      </a>
    </main>
  );
}

export default Home;
