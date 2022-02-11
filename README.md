## HW1-510

# Client 

* index.js uploaded to repo 

# Server 

* Screencast Link

# Concepts

1. You can lose the ability to maintain within sessions because it is stateless.  They are also defined by constraints and depend on caching.There are also major secruity risks that come with by it's use of http protocol as well as no implementation limiting rate/throttling. 


2. The developers of GraphQL intended to solve the inefficeincies experienced with REST APIs. They did this by solving over fetching and underfetching with REST APIs. The only way for data to download is by using fixed data structures - meaning that in some instances a client may download more information than needed or a client will have to make additional request to get all the information needed. REST API servers have intended purposes while GraphQL uses queries to pull all the info needed into one. This allows clients to not have to do anything outside the query. With REST API, the info for a view is accessed by the corresponding endpoint but this is limiting and doesn't allow for rapid iterations - GraphQL is flexible because data requirement are specified and not needed to make adjustments. It also allows insight on how the data is being used and can even be monitored. GraphQL also uses schema to create a contract between clients and servers on how data will be accessed. GraphQL also allows querying nested information and arguments specified in schema. 
