# YamaUI - Yet another ollama user interface

<div align="center">
	<img src="./public/yamaui.png" width=500>
    <p> Your AI bridge first choice when the issue is security and your goal is innovation </p>
</div>

# Demonstration
<img src="./public/example.png"/>

# Architecture
<div align="center">
	<img src="./public/arquitecture.png" width=550>
    <p> Private LLM Cloud Deployment </p>
</div>

# Running this project

## Local

### Pre-requisites
- docker-compose

### Running - Local
1a. Edit the .env `DBConnection` file to match with your MongoDB Server (I am using MongoDB Atlas)
```bash
# .env
DBConnection="mongodb+srv://<USER>:<PASSWORD>@<ACCOUNT>.<SHARD>.mongodb.net"
DBName="yamaui"
```
1b. If you don't have a MongoDB and don't want create one, 
```
docker run -d \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=securepassword \
  -p 27017:27017 \
  mongo
```
your env should be something like it:
```bash
# .env
DBConnection="mongodb://root:securepassword@localhost:27017"
DBName="YamaUI"
```

2. Run the project
```bash
docker compose up
# Open: http://localhost:3000
```

## AWS Cloud

### Pre-requisites
- Terraform
- AWS Credentials (recommended usage **aws-vault** over persistent credentials)
    1. > $ aws configure
    2. > $ aws-vault exec \<PROFILE\>
- MongoDB Server
    > You can start free with [MongoDB Atlas Free Cluster](https://www.mongodb.com/lp/cloud/atlas/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_retarget-brand_gic-null_amers-all_ps-all_desktop_eng_lead&utm_term=mongodb%20atlas%20free&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=14412646314&adgroup=131761122132&cq_cmp=14412646314&gad_source=1&gclid=Cj0KCQjwhb60BhClARIsABGGtw8Td5VN-RcXBIjasm-NPR_fWlqRqnDxAyhMQzQANuFbT-un3dhEW7UaAu4LEALw_wcB)
1. Edit the .env `DBConnection` file to match with your MongoDB Server (I am using MongoDB Atlas)
```bash
# .env
DBConnection="mongodb+srv://<USER>:<PASSWORD>@<ACCOUNT>.<SHARD>.mongodb.net"
DBName="yamaui"
```
2. With aws credentials configured, run
```bash
terraform init
terraform apply
```

# Developing local with Bun, ViteJS and ExpressJS

## Pre-requisites
- bun
- docker or ollama

## Instructions

1. `bun install` # Install all dependencies
2. `bun run frontend` # Run the frontend (React + ViteJS)
3. `bun run backend` # Run the backend (ExpressJS)

## Docs
- [shadcn/ui](https://ui.shadcn.com/docs/components/accordion)
> bunx shadcn-ui@latest add
- [hypercolor -> tailwindcss](https://hypercolor.dev/)
> Get some color palettes for your tailwindcss project
- [tailwindcss](https://tailwindcss.com/docs)
> Tailwindcss documentation

## Credits
- https://www.flaticon.com/

### Freepik
<img src="./public/llm.png" width=50> <img src="./public/hacker.png" width=50>

### photo3idea_studio
<img src="./public/ai.png" width=50>

### Pixelmeetup
<img src="./public/duck.png" width=50>
