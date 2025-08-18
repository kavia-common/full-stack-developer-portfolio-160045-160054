#!/bin/bash
cd /home/kavia/workspace/code-generation/full-stack-developer-portfolio-160045-160054/portfolio_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

