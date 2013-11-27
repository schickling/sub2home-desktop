set :stage, :production

role :app, %w{www-data@54.229.26.88}

set :ssh_options, {
  keys: %w(cert/schickling.pem),
  auth_methods: %w(publickey)
}