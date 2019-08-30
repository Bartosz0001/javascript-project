	'use strict';

	const titleClickHandler = function(event){
		console.log('Link was clicked!');
		const clickedElement = this;

		  /* remove class 'active' from all article links  */
		  
		const activeLinks = document.querySelectorAll('.titles a.active');

		for(let activeLink of activeLinks){
			activeLink.classList.remove('active');
		}

		  /* add class 'active' to the clicked link */
		  
		clickedElement.classList.add('active');

		  /* remove class 'active' from all articles */
		  
		const activeArticles = document.querySelectorAll('.posts .active');

		for(let activeArticle of activeArticles){
			activeArticle.classList.remove('active');
		}

		  /* get 'href' attribute from the clicked link */
		  
		const idOfClickedElement = clickedElement.getAttribute('href');

		  /* find the correct article using the selector (value of 'href' attribute) */
		  
		const currentArticle = document.querySelector(idOfClickedElement);

		  /* add class 'active' to the correct article */
		  
		currentArticle.classList.add('active');
	}
	
	const optArticleSelector = '.post',
	  optTitleSelector = '.post-title',
	  optTitleListSelector = '.titles',
	  optArticleTagsSelector = '.post-tags .list',
	  optArticleAuthorSelector = '.post-author',
	  optTagsListSelector = '.tags.list',
	  optCloudClassCount = 5,
	  optCloudClassPrefix = 'tag-size-';

	function generateTitleLinks(customSelector = ''){

		  /* remove contents of titleList */
		  
		const titleList = document.querySelector(optTitleListSelector);
		titleList.innerHTML = '';
		
		  /* find all the articles and save them to variable: articles */
		
		let html = '';

		  /* for each article */
		  
		const articles = document.querySelectorAll(optArticleSelector + customSelector);
		
		for(let article of articles) {
			/* get the article id */
			const articleId = article.getAttribute('id');
			/* find the title element */
			/* get the title from the title element */
			const articleTitle = article.querySelector(optTitleSelector).innerHTML;
			/* create HTML of the link */
			const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
			
			html = html + linkHTML;
			/*titleList.insertAdjacentHTML('beforeend', linkHTML);*/
		}
		
		/* insert link into titleList */
		titleList.innerHTML = html;

		const links = document.querySelectorAll('.titles a');

		for(let link of links){
			link.addEventListener('click', titleClickHandler);
		}

	}

	generateTitleLinks();
	
	function calculateTagsParams(tags){
		const params = {
			max: 0,
			min: 999999
		}
		
		//for(let tag of tags)
		for(let tag in tags){
			if(tags[tag] > params.max) params.max = tags[tag];
			if(tags[tag] < params.min) params.min = tags[tag];
		}

		return params;
	}
	
	function calculateTagClass(count, params){
		const device = (params.max-params.min)/optCloudClassCount;
		let result;
		if(count >= params.min && count <= params.min+device) result = 1;
		else if(count > params.min+device && count <= params.min+2*device) result = 2;
		else if(count > params.min+2*device && count <= params.min+3*device) result = 3;
		else if(count > params.min+3*device && count <= params.min+4*device) result = 4;
		else if(count > params.min+4*device && count <= params.min+5*device) result = 5;
		
		const prefix = optCloudClassPrefix + result;
		return prefix;
	}
	
	function generateTags(){
	  /* create a new variable allTags with an empty object */
	  let allTags = {};
	  
	  /* find all articles */
	  
	  const articles = document.querySelectorAll(optArticleSelector);
	  
	  /* START LOOP: for every article: */
	  
	  for(let article of articles) {	

		/* find tags wrapper */
		
		const titleList = article.querySelector(optArticleTagsSelector);
		titleList.innerHTML = '';

		/* make html variable with empty string */
		
		let html = '';

		/* get tags from data-tags attribute */
		
		const articleTags = article.getAttribute('data-tags');
		console.log(articleTags);

		/* split tags into array */
		
		const articleTagsArray = articleTags.split(' ');

		/* START LOOP: for each tag */
		
		for(let tag of articleTagsArray) {

		  /* generate HTML of the link */
		  
		  const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

		  /* add generated code to html variable */
		  
		  html += linkHTML;
		  
		  /* check if this link is NOT already in allTags */
		  
		  if(!allTags.hasOwnProperty(tag)){
			  
          /*  add tag to allTags object */
		
            allTags[tag] = 1;
          }
		  else{
			  allTags[tag]++;
		  }

		/* END LOOP: for each tag */
		
		}

		/* insert HTML of all the links into the tags wrapper */
		
		titleList.innerHTML = html;

	  /* END LOOP: for every article: */
	  
	  }
	  
	  /*  find list of tags in right column */
	  
		const tagList = document.querySelector('.tags');
		
		const tagsParams = calculateTagsParams(allTags);

	  /*  create variable for all links HTML code */
	  
		let allTagsHTML = '';
		
		/* START LOOP: for each tag in allTags */
		
		for(let tag in allTags){
			/* generate code of a link and add it to allTagsHTML */
			
			allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a><span> (' + allTags[tag] + ') </span></li>';
		}
		
		/* add html from allTagsHTML to tagList */
		
		tagList.innerHTML = allTagsHTML;
		/* <li><a href="#">design</a> <span>(6)</span></li> */
	}

	generateTags();
	
	function tagClickHandler(event){
		/* prevent default action for this event */
		
		event.preventDefault();

		/* make new constant named "clickedElement" and give it the value of "this" */
		
		const clickedElement = this;

		  /* make a new constant "href" and read the attribute "href" of the clicked element */
		  
		  const href = clickedElement.getAttribute('href'); 

		  /* make a new constant "tag" and extract tag from the "href" constant */
		  
		  const tag = href.slice(5);
		  /*const tag = href.replace('#tag-', '');*/
		  
		  /* find all tag links with class active */
		  
		  const allActive = document.querySelectorAll('a.active[href^="#tag-"]');

		  /* START LOOP: for each active tag link */
		  
		  for(let activeLink of allActive) {

			/* remove class active */
			
			activeLink.classList.remove('active');

		  /* END LOOP: for each active tag link */
		  
		  }

		  /* find all tag links with "href" attribute equal to the "href" constant */
		  
		  const equalHrefAttributes = document.querySelectorAll('a[href="' + href + '"]');

		  /* START LOOP: for each found tag link */
		  
		  for(let equalHrefAttribute of equalHrefAttributes) {

			/* add class active */
			
			equalHrefAttribute.classList.add('active');

		  /* END LOOP: for each found tag link */
		  
		  }

		  /* execute function "generateTitleLinks" with article selector as argument */
		  
		  generateTitleLinks('[data-tags~="' + tag + '"]');
	}

	function addClickListenersToTags(){
	  /* find all links to tags */
	  
	  const links = document.querySelectorAll('.list a, .tags a');

	  /* START LOOP: for each link */
	  
	  for(let link of links){

		/* add tagClickHandler as event listener for that link */
		
		link.addEventListener('click', tagClickHandler);

	  /* END LOOP: for each link */
	  
	  }
	}

	addClickListenersToTags();

	function generateAuthors(){
		
		const articles = document.querySelectorAll(optArticleSelector);
		let allAuthors = {};
		
		for(let article of articles) {	
			const titleList = article.querySelector(optArticleAuthorSelector);
			titleList.innerHTML = '';
			let html = '';
			const articleAuthor = article.getAttribute('data-author');
			
			if(!allAuthors.hasOwnProperty(articleAuthor)){
				allAuthors[articleAuthor] = 1;
			}
			else{
				allAuthors[articleAuthor]++;
			}
		
			const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>'; 
			html += linkHTML;
			titleList.innerHTML = html;
		}
		
		const authorsList = document.querySelector('.authors'); 
		let authorsHTML = '';
		
		for(let author in allAuthors){
			authorsHTML += '<li><a href="#author-' + author + '">' + author + '</a><span> ' + allAuthors[author] + '</span></li>';
		}
		authorsList.innerHTML = authorsHTML;
	}
	
	generateAuthors();
	
	function authorClickHandler(event){		
		event.preventDefault();		
		const clickedElement = this;		  
		const href = clickedElement.getAttribute('href'); 
		const author = href.slice(8);
		/*const tag = href.replace('#author-', '');*/ 
		const authorsActive = document.querySelectorAll('a.active[href^="#author-"]'); 
		for(let authorActive of authorsActive){
			authorActive.classList.remove('active');	
		}
		const equalHrefAttributes = document.querySelectorAll('a[href="' + href + '"]');
		for(let equalHrefAttribute of equalHrefAttributes) {			
			equalHrefAttribute.classList.add('active');
		} 
		generateTitleLinks('[data-author="' + author + '"]');
	}
	
	function addClickListenersToAuthors(){	  
		const links = document.querySelectorAll('.post-author a, .authors a');	  
		for(let link of links){		
			link.addEventListener('click', authorClickHandler);
		}
	}
	
	addClickListenersToAuthors();
	