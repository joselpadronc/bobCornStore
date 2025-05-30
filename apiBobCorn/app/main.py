from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.purchases import router as purchases_router

app = FastAPI(
    title="Corn Sales API",
    description="This API allows customers to buy corn with a time restriction per purchase.",
    version="1.0.0"
)

# Configure CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Agrega el dominio de tu frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los headers
)

app.include_router(purchases_router, prefix="/purchases")

@app.get("/")
def home():
    return {"message": "API de venta de maíz está funcionando correctamente"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
