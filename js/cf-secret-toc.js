
  function updateTOC(contentDiv) {
    // Select headers
    const headers = contentDiv.querySelectorAll("h2, h3, h4");
    if (headers.length === 0) return;

    // Helper to generate IDs
    const slugify = (text) => text.toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
        .replace(/^-+|-+$/g, "");

    // Function to append headers to a container
    const appendToContainer = (containerId) => {
        let container = document.getElementById(containerId);
        
        // If container doesn't exist, try to create it
        if (!container) {
            if (containerId === 'toc') {
               const menu = document.getElementById('menu');
               const share = document.getElementById('share');
               if (menu) {
                   container = document.createElement('div');
                   container.id = 'toc';
                   if (share) {
                       share.insertAdjacentElement('afterend', container);
                   } else {
                       menu.appendChild(container);
                   }
               }
            } else if (containerId === 'toc-footer') {
               const footerPost = document.getElementById('footer-post');
               const navFooter = document.getElementById('nav-footer');
               if (footerPost) {
                   container = document.createElement('div');
                   container.id = 'toc-footer';
                   container.style.display = 'none'; 
                   if (navFooter) {
                       navFooter.insertAdjacentElement('afterend', container);
                   } else {
                       footerPost.appendChild(container);
                   }

                   // Ensure toggle button
                   const actionsFooter = document.getElementById('actions-footer');
                   if (actionsFooter && !document.getElementById('toc-toggle')) {
                       const menuToggle = document.getElementById('menu-toggle');
                       const tocToggle = document.createElement('a');
                       tocToggle.id = 'toc-toggle';
                       tocToggle.className = 'icon';
                       tocToggle.href = '#';
                       tocToggle.setAttribute('aria-label', 'TOC');
                       tocToggle.innerHTML = '<i class="fas fa-list fa-lg" aria-hidden="true"></i> TOC';
                       
                       tocToggle.onclick = function(e) { 
                           e.preventDefault();
                           const el = document.getElementById('toc-footer');
                           el.style.display = el.style.display === 'none' ? 'block' : 'none'; 
                       };
                       
                       if (menuToggle) {
                           menuToggle.insertAdjacentElement('afterend', tocToggle);
                       } else {
                           actionsFooter.prepend(tocToggle);
                       }
                   }
               }
            }
        }

        if (!container) return;
        
        // Ensure container is visible
        if (containerId === 'toc') {
            container.style.display = 'block';
        }

        // Check if nav exists, clear if re-running or create
        let nav = container.querySelector("nav#TableOfContents");
        if (nav) {
            nav.remove(); // Clear existing to rebuild correctly
        }
        
        nav = document.createElement("nav");
        nav.id = "TableOfContents";
        container.appendChild(nav);

        const ul = document.createElement("ul");
        nav.appendChild(ul);
        
        headers.forEach(header => {
            const link = document.createElement("a");
            link.href = "#" + header.id;
            link.innerText = header.innerText; 
            
            const li = document.createElement("li");
            li.appendChild(link);
            ul.appendChild(li);
        });
    };

    appendToContainer("toc");
    appendToContainer("toc-footer");
  }
