# Litter

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

**P2P twitter-clone built on holochain**
A group of puppies is called a *litter.* Maybe it's time for a fully distributed shoutcast network of cute puppies, rather than a certain bluebird.

*Litter* is a work in progress, derived from the Holochain project's [clutter](https://github.com/holochain/clutter)
sample application which exists to demonstrate how easy it is to build applications on holochain.


**Code Status:** Pre-alpha. Not for production use. This application has not been audited for any security validation.

*Note: The committed codebase does not YET reflect this README, which has been written per the intended derivation from the* clutter *application.*

## Installation & Usage

Prerequiste: [Install holochain](https://github.com/metacurrency/holochain/#installation) on your machine and make sure you do the step to set the $GOPATH.

If you want to run Litter locally, you will need `nodejs` installed, with `npm` or `yarn`:
```
git clone https://github.com/murrayjbrown/holochain-litter.git
cd ui-src
npm install # (or yarn install)
npm run build # (or yarn build)
cd ..
```
Now if you want to run the app, you can run:
```
hcdev web # if you want to just run it temporarily and test it out, with scratch data
```
or
```
hcd web # if you want to really start to use the app
```

If you want to just see Litter in action, the best way to try out Litter on your own is to run 2 instances of Litter and your own Bootstrap server.  So clone the latest release from [Litter Release](https://github.com/murrayjbrown/holochain-litter.git) and make 2 copies of the contents into folders called litter1 and litter2.  Both folders will have a dna folder and a ui folder in each.

Firstly run the bootstrap server which will let each instance of Litter know about its peers.  The ```bs```  command is part of the Holochain install.  If it doesn't work you probably need to set the $GO_PATH variable. (Soon we won't need this step)
```
  bs
```
You will get a response like
```
2018/01/11 11:24:03 app version: 0.0.2; Holochain bootstrap server
2018/01/11 11:24:03 starting up on port 3142
```

Now start up Litter in each folder.
```
  cd litter1
  hcdev -no-nat-upnp -port=6001 -agentID=lucy -mdns=true -bootstrapServer=localhost:3142 web 3141

  cd ..
  cd litter2
  hcdev -no-nat-upnp -port=6002 -agentID=phil -mdns=true -bootstrapServer=localhost:3142 web 4141
```
You will see a response like:
```
Copying chain to: /Users/mjbrown/.holochaindev
Serving holochain with DNA hash:QmVbbeDAHVxC9cTvx6UhNEeTCK99SRKfxKDz3s4mR6TnsS on port:3141
```
Now open a browser at http://localhost:3142/QmVbbeDAHVxC9cTvx6UhNEeTCK99SRKfxKDz3s4mR6TnsS (substituting in the DNA hash from the response above if different) and look at the Bootstrap server.  You will see 2 records like this
```doQmVbbeDAHVxC9cTvx6UhNEeTCK99SRKfxKDz3s4mR6TnsS
  [{"Req":{"Version":1,"NodeID":"QmTAjDmQHobs2oQZp4UrbSzkShUGVKcsQUdakHeQ4YYxRX","NodeAddr":"/ip4/0.0.0.0/tcp/6003"},"Remote":"[::1]:63187","LastSeen":"2018-01-11T12:32:15.659887156+11:00"},{"Req":{"Version":1,"NodeID":"QmWQVaqEayZJWnvxLtsKr1iyeTDp3s7m7TTE36HhAUTiTK","NodeAddr":"/ip4/0.0.0.0/tcp/6002"},"Remote":"[::1]:63153","LastSeen":"2018-01-11T12:28:40.85765899+11:00"}]
```
Now open a browser to http://localhost:3141 and you will see Litter.  Open another tab to http://localhost:4141 and you now have 2 instances of Litter that you can chat between.  Add a handle in each and then meow and follow each instance and you will see the meows!!

### Docker Usage
You can do all this much easier with Docker. Clone the latest release from [Litter Release](https://github.com/murrayjbrown/holochain-litter.git) and cd into the folder. Then run
```
  cd ui-src
  npm install # (or yarn install)
  npm run build # (or yarn build)
  cd ..
  TARGETDIR=$(pwd) docker-compose up
```
This will build the source into a React app and install it in Holochain. Then you can open browsers to
```
  http://localhost:3142 - Bootstrap
  http://localhost:3141 - Litter
  http://localhost:4141 - Litter
  http://localhost:5141 - Litter
```
and try out Litter.

### Tests
To run all the stand alone DNA tests:

``` shell
hcdev test
```

## Scenarios

### Scenario - Collision Of Handles - Sequence Diagram

``` shell
  hcdev -no-nat-upnp -mdns=true scenario collisionOfHandles
```

<img src="collisionOfHandles-sequence.svg" width="80%" />

#### followAndShare
``` shell
hcdev -mdns=true scenario followAndShare
```
This test spins up two nodes `jane` and `joe` and tests that following and reading posts works. To watch the network traffic and details try:

``` shell
hcdev -debug -mdns=true scenario followAndShare
```
#### scaling

This test is designed to be run on separate machines and spins up many clones on each and confirms that they all talk to each other.

## UI automation
in litter folder
```
  hcdev -execpath=$HOME/.holochaindev1 -no-nat-upnp -port=6001 -agentID=agent3141 -mdns=true web 3141
  hcdev -execpath=$HOME/.holochaindev2 -no-nat-upnp -port=6002 -agentID=agent4141 -mdns=true web 4141
  hcdev -execpath=$HOME/.holochaindev3 -no-nat-upnp -port=6003 -agentID=agent5141 -mdns=true web 5141
```

if running all in one terminal you will need to kill the processes between restarts.
```
  kill -kill `lsof -t -i tcp:3141` & kill -kill `lsof -t -i tcp:4141` & kill -kill `lsof -t -i tcp:5141`
```

## What the Automated build does

When a branch is pushed to Github Travis runs a build.  The build does the following:
1. Installs docker-compose
2. Runs docker-compose up -d which spins up a bootstrap server and 3 instances of litter
3. Install the cypress dependencies
4. Runs the Cypress e2e tests.
5. If on master a new release is published to github releases. (coming soon)

## Feature Roadmap and Current Progress (TBD)
 - [x] Set default handle from AgentID string
 - [x] Enable users to change their handle
 - [x] Share mews (tweets) -- up to 256 characters
 - [x] Follow someone (by specified handle)
 - [x] Unfollow someone
 - [x] View post stream of people you follow sorted by time
 - [x] Detect #hashtags in post text
 - [x] Create hashtag anchors if they don't exist
 - [x] Link from hashtag anchor to posts with that hashtag
 - [x] Show posts which have a particular hashtag
 - [x] Mark posts as a favorite :star:
 - [x] Link favorited posts from a user/handle
 - [ ] Show someone's :star: favorited posts
 - [ ] Edit a previous post **(partially implemented)**
 - [ ] Refollow someone previously unfollowed **(partially implemented - Have to fix put/del/put links sequence)**
 - [ ] Detect @mentions in post text
 - [ ] Link from handle posts which @mention them
 - [ ] Show @mentions for a user/handle
 - [ ] Lists - Special anchor type with text being "*[userhandle]-[listname]*" with links to users on a named list which is named unique-per-user
 - [ ] Reply to mew (add reply-to link + link to replies)
 - [ ] Remew/Retweet (link to original in content of post? + new content?)
 - [ ] Enable direct messages via N2N private messaging
 - [ ] Detect links
 - [ ] Include links (w/ link shortening?) as linked link
 - [ ] Pretty display of OpenGraph data for first link
 - [ ] Create/Read/Update/Delete User profile info (first name, last name, location, picture, website, etc.)
 - [ ] Keyword indexing/search with Holodex integration
 - [ ] Search with result groupings/tabs (people, posts, tags, trending, )
 - [ ] Add UI tabs/views: feed, mentions, direct messages, lists
 - [ ] Embed pictures ("pic" link to url) with pretty render
 - [ ] Integrate with Twitter for publishing mews to tweets from your unique userspace
 - [ ] Integrate with DPKI for bridging app contexts


## Contribute
The Holochain project welcomes pull requests and issue tickets.  Find us on [gitter](https://gitter.im/metacurrency/holochain) to chat.

Contributors to this project are expected to follow our [development protocols & practices](https://github.com/metacurrency/holochain/wiki/Development-Protocols).

## License
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

Copyright (C) 2017, The MetaCurrency Project (Eric Harris-Braun, Arthur Brock, et. al.)

This program is free software: you can redistribute it and/or modify it under the terms of the license provided in the LICENSE file (GPLv3).  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

**Note:** We are considering other 'looser' licensing options (like MIT license) but at this stage are using GPL while we're getting the matter sorted out.
