FROM ruimarinho/bitcoin-core:0.17.0

WORKDIR /home/bitcoin

ADD package.json /home/bitcoin/
ADD package-lock.json /home/bitcoin/

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN npm install

ADD bitcoin.conf /home/bitcoin/
ADD startup.sh /home/bitcoin/
ADD faucet.js /home/bitcoin/

ENTRYPOINT /home/bitcoin/startup.sh
