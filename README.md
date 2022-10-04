# la-boite-a-sel (soundbox)


### Docker dev


First, setup `./docker.env.docker` based on `./docker.env.docker.dist`
Then,

```sh
# host
cd docker
bash stack.sh dev up -d
docker exec -ti -u root laboiteasel_node17_cli sh -l

# container
# At the first time, don't forget to install vendors
npm install


# Compile and Hot-Reload for Development
npm run dev

# Compile and Minify for Production
npm run build

# Lint with [ESLint](https://eslint.org/)
npm run lint
```
