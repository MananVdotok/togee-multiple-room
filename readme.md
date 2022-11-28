step #1

clone repo

install all dependencies by running command

npm i

run cypress project as:

./node_modules/.bin/cypress open

By default it will make 2 room one after one
duration of each room will be 2 minutes
if you want to increase or decrease time, room count or viewer count you can change
variable values in:
./cypress/e2e/GlobalVariables.js

after your required configuration complete run the below
run multpleRoomCreation.cy.js
