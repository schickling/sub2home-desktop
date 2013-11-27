set :application, "sub2home/desktop"
set :repo_url, "git@github.com:schickling/sub2home-desktop.git"

set :deploy_to, "/var/www/desktop"

set :log_level, :info
set :keep_releases, 8

namespace :deploy do

  desc "Restart"
  task :restart do
  end

  desc "Build"
  before :updated, :build do
    on roles(:app), in: :parallel do
      within release_path  do
        execute :npm, "install --silent"
        execute :bower, "install --silent"
      end
    end
    on roles(:app) do
      within release_path do
        execute :grunt
      end
    end
  end

  after :finishing, "deploy:cleanup"

end
