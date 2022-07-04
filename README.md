  # Description 
    Clean Typescript API made with NodeJS,Express and Prisma
 
  # Features
    - Tested with JEST
    - Error reports with Sentry.IO
    - Dockerized
    - padronized HTTP error handling
    
  # Setup
   #### Development
      Requirements
        - Docker ( for the database ) or Postgres installed
        - NodeJS 
        
        run npm install or yarn on the root folder to install the required packages.
        run cp .env.example .env and fill in required environment variables
        run npx prisma generate to generate prisma models
        run npm run dev to serve the server on the choosen env { HTTP_SERVER_PORT }
        
   #### Production
        Requirements 
          - Docker
          
          Inject environment variables
          run docker-compose up
          
          
      
  ### Workspace import data available on the Postman folder in the repository
  
