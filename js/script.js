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
	
  const activeArticles = document.querySelectorAll('.posts article.active');

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

};


{

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author .list',
    optTagsListSelector = '.list.tags',
    optAuthorsListSelector = '.list.authors',
    optCloudClassCount = '5' ,
    optCloudClassPrefix = 'tag-size-';

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

      html += linkHTML; //html = html + linkHTML;
      
    }
    
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){

      link.addEventListener('click', titleClickHandler);
    }
    
  }
  
  generateTitleLinks();

  
  

  function calculateTagsParams(tags){
  /*[DONE] create obj with min and max value */
    const PARAMS = {
      max : 0,
      min : 999999
    };
    /*[DONE] loop thur all tags and count */
    for(let tag in tags){
      if(tags[tag] > PARAMS.max){
        PARAMS.max = tags[tag];
      } else {
        PARAMS.min = tags[tag];
      }
    }
    /*[DONE] return PARAMS objc */
    return PARAMS;
  }

  function calculateTagClass(count, params){
    
    /*[DONE] reduce counte vaule */
    const normalizedCount = count - params.min;

    /*[DONE] reduce max value */
    const normalizedMax = params.max -params.min;

    /*[DONE] get % */
    const PERCENTAGE = normalizedCount / normalizedMax;

    /*[DONE] round down */
    const calssNumber = Math.floor( PERCENTAGE * (optCloudClassCount - 1) + 1 );

    /*[DONE] return tag count value */
    return calssNumber;
  }
  

  function generateTags(){

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    
    /* [DONE] find all articles */
    const allArticles = document.querySelectorAll(optArticleSelector);
    /* [DONE] START LOOP: for every article: */
    for(let article of allArticles){
      
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
        html += linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags.hasOwnProperty(tag)){

          /* [NEW] add to allTags object */
          allTags[tag] = 1;
        } 
        else {
          allTags[tag] ++;
        }
        /* [DONE] END LOOP: for each tag */

      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.insertAdjacentHTML('beforeend', html);
      
      
      /* [DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    const tagsParams = calculateTagsParams(allTags);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* START LOOP: for each tag in allTags */
    for(let tag in allTags){

      /* [NEW] generatee code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '"' + ' href="#tag-' + tag + '">'+ tag + '</a>' +'</li>';
      /* [NEW] END LOOP: for each tag in allTags */
    }

    /* [New] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML; 
      
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
    
    /* [DONE] find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    
    /* [DONE] START LOOP: for each active tag link */
    for(let activeTag of activeTags){
    
      /* [DONE] remove class active */
      activeTag.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
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
    const rLinks = document.querySelectorAll('.tags a');

    /* [DONE] START LOOP: for each link */
    for(let tagLink of tagLinks){

      /* [DONE] add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */
    }
    for (let link of rLinks) {
      /*[done] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToTags();
  

  function generateAuthors(){
    /* [NEW] create a new variable allAuthorTags with an empty object */
    let allAuthorTags = {};

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
      const linkHTML = '<li><a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a></li>';
      
      /* [DONE] add generated code to html variable */
      html += linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthorTags.hasOwnProperty(authorTags)){
        /* [NEW] add generated code to allTags array */
        allAuthorTags[authorTags] = 1;
      }
      else{
        allAuthorTags[authorTags]++;
      }
      
      /* [DONE] insert HTML of all the links into the Author wrapper */
      authorWrapper.insertAdjacentHTML('beforeend', html);

      
      /* [DONE] END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const authorTagList = document.querySelector(optAuthorsListSelector);

    /* [NEW] add html from allTags to tagList */
    //authorTagList.innerHTML = allAuthorTags.join(' ');
    /* [NEW] create variable for all links HTML code */
    let allAuthorTagsHTML = '';

    /* START LOOP: for each tag in allAuthorTags */
    for(let tag in allAuthorTags){

      /* [NEW] generatee code of a link and add it to allAuthorTagsHTML */
      allAuthorTagsHTML += '<li><a href="#author-' + tag + '"><span>' + tag + ' (' + allAuthorTags[tag] + ')' + '</span></a></li>';
      /* [NEW] END LOOP: for each tag in allAuthorTags */
    }
    authorTagList.innerHTML = allAuthorTagsHTML;
  }

  generateAuthors();


  function authorClickHandler(event){

    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "author" and extract authorTag from the "href" constant */
    const author = href.replace('#author-', '');
    
    /* [DONE] find all authorTag links with class active */
    const activeAuthorTags = document.querySelectorAll('a.active[href^="#author-"]');
    
    /* [DONE] START LOOP: for each active author tag link */
    for(let activeAuthorTag of activeAuthorTags){
    
      /* [DONE] remove class active */
      activeAuthorTag.classList.remove('active');

    /* [DONE] END LOOP: for each active author tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const targetAuthorTags = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(let targetAuthorTag of targetAuthorTags){

      /* [DONE] add class active */
      targetAuthorTag.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors(){

    /* [DONE] find all links to authorsTags */
    const authorLinks = document.querySelectorAll('.post-author a');
    const rLinks = document.querySelectorAll('.authors a');

    /* [DONE] START LOOP: for each link */
    for(let authorLink of authorLinks){

      /* [DONE] add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */
    }
    for (let link of rLinks) {
      link.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors(); 

}