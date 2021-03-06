# Flushr
<a href="http://www.flushr.info" target="_onclick">Flushr</a> is a web application for users to find, review, and rate public restrooms anywhere in the world. Built with Ruby, Rails, Flux, React.js, PostgreSQL, Google Maps API, Twitter Bootstrap, and jQuery.
<p>
This platform also relies on crowdsourcing so new restroom location information is kept up-to-date. With a Flushr account, a user can instantly place a new marker on Google Maps whenever a new restroom is encountered as well as write reviews for restrooms. However, anyone can access Flushr's search feature and read user reviews at a particular location.

## Features
- [x] Create user accounts with secure authentication
- [x] Search for restrooms in current Google Maps window
- [x] Tags and pictures of locations in search results list
- [x] View location details and reviews written by other users
- [x] Write your own reviews and submit a rating
- [x] Add new restroom location to map (crowdsourced)

## Design Docs
<a href="https://github.com/kl2611/flushr/blob/master/docs/schema.md">Database Schema</a>
<br />
<a href="https://github.com/kl2611/flushr/blob/master/docs/proposal.md">Project Proposal</a>

## Code
### Backend
- Ruby on Rails with PostgreSQL
- Controllers handle data through JSON API upon AJAX requests

### Frontend
- Single page app powered by React, ReactRouter, and Flux
- SessionStore to manage user login/logout status
- Bootstrap for site layout and component placement
- jQuery for AJAX requests

## Bonus Features (TBD)
- [ ] Add photos for restroom location
- [ ] Edit personal profile (profile picture and basic details)
- [ ] Sort restrooms based on distance, review ratings, and number of reviews
