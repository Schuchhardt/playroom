# rake load:establishments
namespace :load do
	
	ROOT_ESTABLISHMENTS = "#{Rails.root}/db/data/establishments/"

	task :establishments => :environment do

		csv_text = File.read("#{ROOT_ESTABLISHMENTS}InfoColegios.csv")
		csv = CSV.parse(csv_text, :headers => true)
		csv.each do |row|
			puts row.inspect
			commune = Commune.find_by_name row['Comuna']
			levels = row['Niveles educacionales']

			e = Establishment.create(
				education_level_preschool: levels.downcase.include?('párvulo'),
				education_level_primary: levels.downcase.include?('básica'),
				education_level_secondary: levels.downcase.include?('media'),
				education_level_secondary_tech: levels.downcase.include?('media técnico'),
				establishment_kind: row['Dependencia'],
				ive: row['IVE ( % )'],
				name: row['Colegio'],
				rbd: row['RBD'],
				students_per_course: row['N° estudiantes por curso (aprox)'],
				total_students: row['Nº de estudiantes total (colegio)'],
				commune: commune
			)
			puts e.inspect
		end

	end

end