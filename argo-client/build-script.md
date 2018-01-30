## Building docker images

* Start docker daemon, then:
`docker build -t flowworks-carlsolutions.azurecr.io/flowworks/argo-impl-client .`

* Find unique id of built image:
`docker images`

* Run the image to test
`docker run -d -p 8450:80 [imageId]`

* Visit http://localhost:8450 in the browser.

## Pushing docker image to repository

```
docker push flowworks-carlsolutions.azurecr.io/flowworks/argo-impl-client
```

## Republishing k8s deployment

```
kubectl delete deployment argo-impl-client
kubectl create -f argo-impl-client.yaml
```

## Exposing the deployment with an IP

**This step should be done only once** as it creates a k8s service. Services are independent to deployments and live even if deployments get deleted.

```
kubectl expose deployment argo-impl-client --type=LoadBalancer --name=argo-impl-client
```