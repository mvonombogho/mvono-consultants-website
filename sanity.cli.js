/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({ 
  api: { 
    projectId: 'k6xvho7h', 
    dataset: 'production' 
  } 
})
