#!/usr/bin/env bash


# Install docker client. Addresses the error "Docker not installed". "setup_remote_docker" is not enough
function installDockerClient() {
  set -x
  VER="17.03.1-ce"
  curl -L -o /tmp/docker-$VER.tgz https://get.docker.com/builds/Linux/x86_64/docker-$VER.tgz
  tar -xz -C /tmp -f /tmp/docker-$VER.tgz
  mv /tmp/docker/* /usr/bin
}

# Authenticate with a service account, set GCP project and compute zone
function gcpAuthenticate() {
  googleAuth=$1
  googleProjectId=$2
  googleComputeZone=$3

  echo ${googleAuth} | base64 -i --decode > gcp-key.json
  gcloud auth activate-service-account --key-file gcp-key.json
  gcloud --quiet config set project ${googleProjectId}
  gcloud --quiet config set compute/zone ${googleComputeZone}
}

# Authenticate to a GKE cluster
function gkeClustersGetCredentials() {
  googleClusterName=$1
  gcloud --quiet container clusters get-credentials ${googleClusterName}
}

# Prints names of all pods in the 'Running'
function getPodNamesInStateRunning() {
  namespace=$1
  label=$2

  kubectl -n ${namespace} get pods -l name=${label} -o go-template --template '{{range .items}}{{.metadata.name}}{{" "}}{{.status.phase}}{{"\\n"}}{{end}}'|grep Running|awk '{print $1}'
}

# Prints pod name of running pod with given label. Waits until there is exactly one pod in state 'Running'
function getPodName() {
  namespace=$1
  label=$2

  podName=''
  n=0
  while true; do
    if [ -n "${podName}" ]; then
      # podName contains something
      if [[ !("${podName}" == *$'\n'*) ]]; then
        # podName does not contain multiple rows (pods)
        echo $podName
        return
      fi
    fi

    podName=`getPodNamesInStateRunning ${namespace} ${label}`
    if [ $? -gt 0 ]; then
      return # No pods are running
    fi
    if [ -z "${podName}" ]; then
      return # No pods are running
    fi

    n=$((n+1))
    if [ $n -gt 60 ]; then
      (>&2 echo "Timeout waiting for a single or no pod running, podName ${podName}")
      return
    fi
    sleep 1
  done
}

# Delete all deployments in a namespace
function deleteDeployments() {
  namespace=$1
  (>&2 echo "Deleting deployments in ${namespace}")
  kubectl -n ${APP_NAME}-it delete deployment `kubectl -n ${namespace} get deployments -o jsonpath={.items[*].metadata.name}`
}
