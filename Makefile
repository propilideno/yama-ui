all:

ssh:
	@ssh -L 3000:localhost:3000 -L 5000:localhost:5000 -L 11434:localhost:11434 ubuntu@$(shell terraform output -json | jq -r .public_ip.value)
