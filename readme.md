


$ docker run --rm -it --cap-add=ALL -v /Users/admin/Sites/dual-client-server:/data -w /data node8:local bash

# https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
# To test which is actually needed: => --cap-add=CHOWN --cap-add=SETGID --cap-add=SETUID

# docker-compose.yml
  cap_add:
    - ALL
  privileged: true

$ node main.js &
$ ./node_modules/puppeteer/.local-chromium/linux-499413/chrome-linux/chrome --no-sandbox --headless --disable-gpu --screenshot --window-size=412,732 http://127.0.0.1:4444



# test with the original client bundle.js

# add (session.cookie) for logout timer