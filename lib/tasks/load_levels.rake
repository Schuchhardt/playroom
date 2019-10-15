# rake load:levels
namespace :load do

	task :levels => :environment do

		levels = [
			{
				name: "Primer Nivel (Sala cuna)",
				since_age: 0,
				category: "PreBásica",
				subcategory: "Educación de Párvulos"
			},
			{
				name: "Segundo Nivel (Medio)",
				since_age: 2,
				category: "PreBásica",
				subcategory: "Educación de Párvulos"	
			},
			{
				name: "Tercer Nivel (Transición)",
				since_age: 4,
				category: "PreBásica",
				subcategory: "Educación de Párvulos"	
			},
			{
				name: "Pre Kinder",
				since_age: 4,
				category: "PreBásica",
				subcategory: "Preescolar"	
			},
			{
				name: "Kinder",
				since_age: 5,
				category: "PreBásica",
				subcategory: "Preescolar"	
			},
			{
				name: "1ro Básico",
				since_age: 6,
				category: "Básica",
				subcategory: "1º Ciclo"	
			},
			{
				name: "2do Básico",
				since_age: 7,
				category: "Básica",
				subcategory: "1º Ciclo"	
			},
			{
				name: "3ro Básico",
				since_age: 8,
				category: "Básica",
				subcategory: "1º Ciclo"	
			},
			{
				name: "4to Básico",
				since_age: 9,
				category: "Básica",
				subcategory: "1º Ciclo"	
			},
			{
				name: "5to Básico",
				since_age: 10,
				category: "Básica",
				subcategory: "2º Ciclo"	
			},
			{
				name: "6to Básico",
				since_age: 11,
				category: "Básica",
				subcategory: "2º Ciclo"	
			},
			{
				name: "7mo Básico",
				since_age: 12,
				category: "Básica",
				subcategory: "2º Ciclo"	
			},
			{
				name: "8vo Básico",
				since_age: 13,
				category: "Básica",
				subcategory: "2º Ciclo"	
			},
			{
				name: "I Medio",
				since_age: 14,
				category: "Media",
				subcategory: "Educación Media"
			},
			{
				name: "II Medio",
				since_age: 15,
				category: "Media",
				subcategory: "Educación Media"
			},
			{
				name: "III Medio",
				since_age: 16,
				category: "Media",
				subcategory: "Educación Media"
			},
			{
				name: "IV Medio",
				since_age: 17,
				category: "Media",
				subcategory: "Educación Media"
			}
		]

		# Level.destroy_all

		levels.each do |level|
			l = Level.find_or_create_by level
			puts l.inspect
		end

	end

end