Homeward Bound is a web application designed to help pet owners find their lost pets. 
The app provides a platform through which users can create profiles for their lost pets; additionally, users can query local shelter databases via the PetFinder API. 
Next steps involve incorporating popular social media applications (i.e. NextDoor, Facebook, Twitter, etc.) to allow users to set up alerts. 

Built With
Node.js - a javascript runtime
Express - framework for Node.js
Knex - SQL query builder
PostgreSQL - relational database management system

Database Relationships

The structure of the relationships are:

A user can have multiple lost pets and each lost pet belongs to only one user
A user can have multiple found pets and each found pet belongs to only one user

Authentication
In order to have user authentication through a gmail account the following packages were installed:

passport
passport-google-oauth20
JWT
In additional to installing the above packages, my .env folder holds client-ids and client-secrets for the PetFinder and Google Maps APIs.  

Contributors
The PetFinder API was used to retrieve shelter pet information in real-time to allow users to actively query current shelter pets.
The Google Maps API allowed users to add location information to their lost/found pet profile; this location data (lat/lon values) were stored with each pet instance.

Author
Katie Wokasch
