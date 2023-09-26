# rake load:game_pdfs
namespace :load do
	
	GAMEINFO_CSV = "#{Rails.root}/db/data/games/gamepdfs.csv"

    task :game_pdfs => :environment do
        
        puts "Loading game pdfs"
        games_updated = 0
		csv_text = File.read(GAMEINFO_CSV)
		csv = CSV.parse(csv_text, :headers => true)
        csv.each do |row| 
            game = Game.find_by id: row['ID']
            if game
                game.update! pdf_url: row['PDF_URL']
                games_updated += 1
                puts game.inspect
            else
                puts "Game not found: #{row['ID']}"
            end
		end
        puts "Games updated: #{games_updated}"

	end

end