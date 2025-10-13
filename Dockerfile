FROM node:18

# Create app directory
WORKDIR /app

# Install n8n globally
RUN npm install -g n8n

# Expose port
ENV N8N_PORT=5678
ENV N8N_BASIC_AUTH_ACTIVE=true
ENV N8N_BASIC_AUTH_USER=tonyadmin
ENV N8N_BASIC_AUTH_PASSWORD=SecurePass123
ENV N8N_PATH=""

EXPOSE 5678

CMD ["n8n"]