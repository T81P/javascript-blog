/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});     */

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;	
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
	
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
	
  const activeArticles = document.querySelectorAll('article');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

}



{

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author .list';

  function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    
    let html = '';
    for(let article of articles){

      /* get the article id */

      const articleId = article.getAttribute('id');
      
      /* find the title element */

      /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';


      /* insert link into titleList */

      html = html + linkHTML;
      
    }
      

    titleList.innerHTML = html;
    
  }
  
  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }



  function generateTags(){
    
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
  
    /* [DONE] START LOOP: for every article: */
    for(let article of articles){
      
      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagSelector);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      
      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      
      /* [DONE] START LOOP: for each tag */
      for(let tag of articleTagsArray){
      
      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      
      /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.insertAdjacentHTML('beforeend', html);
      
      /* [DONE] END LOOP: for every article: */
    }
  }
  
  generateTags();

  function tagClickHandler(event){

    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    
    /* [fixMe] find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    
    /* [DONE] START LOOP: for each active tag link */
    for(let activeTag of activeTags){
    
      /* [DONE] remove class active */
      activeTag.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
    }

    /* [fixMe] find all tag links with "href" attribute equal to the "href" constant */
    const targetTags = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(let targetTag of targetTags){

      /* [DONE] add class active */
      targetTag.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){

    /* [DONE] find all links to tags */
    const tagLinks = document.querySelectorAll('.post-tags a');

    /* [DONE] START LOOP: for each link */
    for(let tagLink of tagLinks){

      /* [DONE] add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */
   }
  }

  function generateAuthors(){

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for(let article of articles){
      
      /* [DONE] find Author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-author attribute */
      const authorTags = article.getAttribute('data-author');
      
      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#' + authorTags + '"><span>' + authorTags + '</span></a></li>';
      
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      
      /* [DONE] insert HTML of all the links into the Author wrapper */
      authorWrapper.insertAdjacentHTML('beforeend', html);
      
      /* [DONE] END LOOP: for every article: */
    }

  }

  generateAuthors();
}