from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil

app = FastAPI()
cpu_history=[]
cpu_status = "Normal"

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_methods= ["*"],
    allow_headers= ["*"]
)

@app.get("/metric") #path parameter(have to edith path to get function return value)
def get_metrics():
    current_cpu = psutil.cpu_percent(interval = 1)
    current_mem =psutil.virtual_memory().percent

    cpu_history.append(current_cpu)
    if len(cpu_history) >10:
        cpu_history.pop(0)


    avg_cpu = sum(cpu_history)/len(cpu_history)

    cpu_status = "Warning: High CPU Usage" if avg_cpu>80 else "Normal"




    return[
        {"name": "CPU Usage: ","value":current_cpu,"unit":"%"},
        {"name": "RAM Usage: ","value":current_mem,"unit":"%"},
        {"name": "CPU Status: ","value":cpu_status,"unit":""},
        {"name": "Disk Usage: ","value":psutil.disk_usage('C:\\').percent,"unit":"%"}
    ]