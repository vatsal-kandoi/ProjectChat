# Task

#### Description

The app is setup as microservices, the python application implementing the parsing of the text, for keywords, and the node application runs the rest of the services.

The user needs to click on the arrow to start a chat, with the computer, and type in the question. The question is sent to the python app, which parses and returns the keywords, which is compared against data.json. If found, it returns the data. If not, it stores the data in the unanswered.txt, so that it can be used later to increase efficiency. 

#### IMPORTANT
*  The Node.js app uses worker_threads, a part of the latest 12 release, which enables users to run processes in parallel to the main loop, without interrupting the main loop, for computation heavy functions. While this is a good feature, it only workes in Node 12+ , therefore a runtime upgrade is  needed. The other option to this is setImmediate() to ensure a free event loop.

* Dockerfiles, though included havent been tested, so they may be faulty.