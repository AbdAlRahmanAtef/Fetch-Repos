let input = document.querySelector("input");
let btn = document.querySelector("button");
let repos = document.querySelector(".repos-data");
btn.onclick = function () {
  getRepos();
}

function getRepos() {
  if (input.value == "") {
    repos.innerHTML = `Please Enter Valid Github Username`
  }
  else {
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((response) => response.json())
      .then((repositries) => {
        repos.innerHTML = "";
        let size = document.createElement("span");
        size.className = "size"
        size.append(
          document.createTextNode(`Number Of Repos: (${repositries.length})`)
        );
        repos.append(size);
        repositries.forEach(repo => {
          // console.log(repo);
          let repoDiv = document.createElement("div");
          repoDiv.className = "repo";
          let btns = document.createElement("div");
          // Repo Name
          let repoName = document.createElement("span");
          repoName.append(document.createTextNode(repo.name));
          // Append Repo Name
          repoDiv.append(repoName);
          // Create Stars
          let stars = document.createElement("span");
          stars.className = "stars"
          stars.append(document.createTextNode(`Stars: ${repo.stargazers_count}`));
          // Append Repo Name
          btns.append(stars);
          repoDiv.append(btns);
          // Create Repo Url
          let visit = document.createElement("a");
          visit.append(document.createTextNode("Visit"));
          visit.href = `https://github.com/${input.value}/${repo.name}`;
          visit.setAttribute("target", "_blank");
          // Append Repo Name
          btns.append(visit)
          // Append Repo Div
          repos.append(repoDiv);
        });

      });
  }
}