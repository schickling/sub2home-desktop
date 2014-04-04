set :application, "desktop"
set :scm, :copy

set :deploy_to, "/var/www/desktop"

set :log_level, :info
set :keep_releases, 8

set :ssh_options, {
  user: "www-data"
}

desc 'Restart application'
task :restart do
  on roles(:app) do
    # nothing to do
  end
end