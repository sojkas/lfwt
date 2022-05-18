#!/bin/sh

npm run build &&
cd build &&
gcloud compute scp * static-ma:/usr/share/nginx/www/demo.fnx.io/lfwt/ --recurse --project "ma-web" --zone "europe-west1-b";
