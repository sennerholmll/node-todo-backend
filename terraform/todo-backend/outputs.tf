
output "google_datastore_namespace" {
    value = "${kubernetes_namespace.todo_backend.metadata.0.name}"
}

output "create_etag" {
    value = "${google_project_iam_member.datastore_user.etag}"
}

output "url" {
	  value = "http://${kubernetes_service.todo_backend.load_balancer_ingress.0.ip}"
}

