# Django PetClinic with Kubernetes & Ingress

**Created by: Ankita Gavali** 🚀

A modern PetClinic management system built with Django and deployed on Kubernetes with NGINX Ingress controller, featuring playful port configurations and scalable architecture. This project demonstrates advanced Kubernetes concepts including Ingress routing, service port mapping, and local development with Kind clusters.

## 🐾 Features

- **Django Backend**: RESTful API for pet and appointment management
- **Pet Management**: Complete CRUD operations for pets
- **Appointment Scheduling**: Book and manage veterinary appointments
- **Kubernetes Deployment**: Scalable container orchestration
- **NGINX Ingress**: Smart routing with multiple access paths
- **Playful Port Configuration**: Multiple service ports (5555, 6666, 8000)
- **Kind Cluster**: Local Kubernetes development environment

## 🏗️ Architecture

```
Browser → Ingress Controller → Service → Pods → Django PetClinic
   ↓              ↓              ↓        ↓         ↓
localhost    nginx:80      port 5555   port 8000  Django
```

## 📋 Prerequisites

1. **Docker**: For containerization
2. **Kind**: Kubernetes in Docker
3. **kubectl**: Kubernetes command-line tool
4. **Python 3.9**: For Django application

## 🛠️ Installation & Setup

### 1. Create Kind Cluster with Ingress Support
```bash
# Create cluster with proper port mappings
kind create cluster --name demo --config kind-ingress-config.yaml
```

### 2. Install NGINX Ingress Controller
```bash
kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/deploy-ingress-nginx.yaml
```

### 3. Deploy PetClinic Application
```bash
# Apply all Kubernetes resources
kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml
kubectl apply -f k8s/ingress.yml
```

## 🌐 Access Points

Your PetClinic app is accessible through multiple paths:

- **`http://localhost/`** → Main app (port 8000)
- **`http://localhost/pets`** → Pet management (port 5555)
- **`http://localhost/appointments`** → Appointment scheduling (port 6666)

## 🔧 Configuration Details

### Service Ports
- **Port 8000**: Main application access
- **Port 5555**: Pet management access
- **Port 6666**: Appointment scheduling access
- **Target Port**: 8000 (Django app)

### Ingress Configuration
- **Host**: localhost
- **SSL Redirect**: Disabled for local development
- **Rewrite Target**: All paths rewritten to `/`

## 📁 Project Structure

```
django-petclinic-kubernetes/
├── k8s/
│   ├── namespace.yml      # Kubernetes namespace
│   ├── deployment.yml     # App deployment (3 replicas)
│   ├── service.yml        # Service with multiple ports
│   └── ingress.yml        # Ingress routing rules
├── pets/                  # Django app for pet management
│   ├── models.py         # Pet and Appointment models
│   ├── views.py          # API views and endpoints
│   ├── serializers.py    # DRF serializers
│   └── urls.py           # URL routing
├── petclinic/            # Django project settings
├── Dockerfile            # Container configuration
└── README.md            # This file
```

## 🚀 Development

### Build Docker Image
```bash
docker build -t anks123/petclinic-app:latest .
```

### Deploy to Kubernetes
```bash
kubectl apply -f k8s/
```

### Check Status
```bash
kubectl get all -n petclinic-namespace
kubectl get ingress -n petclinic-namespace
```

## 🎯 Key Features

- **Scalable**: 3 replicas for high availability
- **Playful**: Multiple service ports for different access patterns
- **Modern**: Kubernetes-native deployment
- **Accessible**: Direct localhost access without port forwarding
- **Flexible**: Easy to extend with additional Django apps

## 👨‍💻 Author & Contributions

**Ankita Gavali** - Full Stack Developer & DevOps Engineer

### What I Built:
- ✅ **Kubernetes Deployment**: Configured 3-replica Django PetClinic deployment
- ✅ **Ingress Controller**: Set up NGINX Ingress with custom routing
- ✅ **Playful Port Configuration**: Creative service port mapping (5555, 6666, 8000)
- ✅ **Kind Cluster Setup**: Local Kubernetes development environment
- ✅ **Docker Containerization**: Optimized Django app containerization
- ✅ **Pet Management System**: Complete CRUD operations for pets and appointments
- ✅ **RESTful API**: Django REST Framework integration

### Technologies Used:
- **Backend**: Django, Python 3.9, Django REST Framework
- **Containerization**: Docker
- **Orchestration**: Kubernetes, Kind
- **Ingress**: NGINX Ingress Controller
- **Database**: SQLite (development)
- **Infrastructure**: Local development with Kind clusters

## 📝 Project Highlights

This setup demonstrates:
- **Advanced Kubernetes patterns**: Multi-port service configuration
- **Ingress routing strategies**: Path-based routing with rewrite rules
- **Local development**: Kind cluster with proper port mappings
- **Scalable architecture**: 3-replica deployment for high availability
- **DevOps best practices**: Complete containerization and orchestration
- **Django best practices**: RESTful API design and model relationships

Perfect showcase of modern DevOps, Kubernetes expertise, and Django development! 🎉

## 🐾 PetClinic Features

### Pet Management
- Register new pets with owner information
- Track pet species, breed, and age
- Manage pet records and history

### Appointment Scheduling
- Book veterinary appointments
- Track appointment status
- Manage appointment notes and reasons

### API Endpoints
- `GET /api/pets/` - List all pets
- `POST /api/pets/` - Create new pet
- `GET /api/appointments/` - List all appointments
- `POST /api/appointments/` - Create new appointment
