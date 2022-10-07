// Description :  RecipeTemplate class (create DOM elements for a recipe)

class TagsTemplate {

    showTags() {
        if (document.contains(document.querySelector('.tag-ul'))) {
            document.querySelector('.tag-ul').remove();
        }
        let ul = document.createElement('ul');
        ul.setAttribute("class", "tag-ul");
        myRecipes._tags.forEach(element => {
            let li = document.createElement('li');
            li.innerHTML = `${element.tag} <i class="bi bi-x-circle"></i>`;
            li.setAttribute("class", "tag-li");
            li.setAttribute("class", `tag-${element.category}`);
            li.setAttribute("onclick", `myRecipes.removeTag("${element.tag}")`);
            ul.appendChild(li);
            taglist.appendChild(ul)
        });
    }
}