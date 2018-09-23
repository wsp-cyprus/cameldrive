#!/bin/bash

echo "Deploy bash script..."
pwd
#echo "Going to install webstudiopro-sails-auth..."
#cd node_modules/webstudiopro-sails-auth/
#pwd
#echo "Going to activate webstudiopro-sails-auth..."
#npm i
#cd ../..
#pwd
echo "Going to install run bower i"
bower i
rm -rf ./assets/vendor/angular-animate/
bower i --save-dev angular-animate@1.6.4