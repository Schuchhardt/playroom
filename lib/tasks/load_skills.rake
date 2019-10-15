# rake load:skills
namespace :load do

	task :skills => :environment do

		skills = [
			{
				name: "Pensamiento Crítico",
				skill_category: "Habilidades del siglo XXI"
			},
			{
				name: "Pensamiento Creativo",
				skill_category: "Habilidades del siglo XXI"
			},
			{
				name: "Resolución de Problemas",
				skill_category: "Habilidades del siglo XXI"
			},
			{
				name: "Comunicación Efectiva",
				skill_category: "Habilidades del siglo XXI"
			},
			{
				name: "Trabajo Colaborativo",
				skill_category: "Habilidades del siglo XXI"
			},
			{
				name: "Empatía",
				skill_category: "Habilidades del siglo XXI"
			},
			{ 
				name: "Recordar",
				skill_category: "Habilidades del Pensamiento"
			},
			{ 
				name: "Comprender",
				skill_category: "Habilidades del Pensamiento"
			},
			{ 
				name: "Aplicar",
				skill_category: "Habilidades del Pensamiento"
			},
			{ 
				name: "Analizar",
				skill_category: "Habilidades del Pensamiento"
			},
			{ 
				name: "Evaluar",
				skill_category: "Habilidades del Pensamiento"
			},
			{ 
				name: "Crear",
				skill_category: "Habilidades del Pensamiento"
			},
			{
				name: "Autonomia",
				skill_category: "Habilidades Socioemocionales"
			},
			{
				name: "Autorregulación",
				skill_category: "Habilidades Socioemocionales"
			},
			{
				name: "Conciencia de los otros",
				skill_category: "Habilidades Socioemocionales"
			},
			{
				name: "Habilidades para relacionarser",
				skill_category: "Habilidades Socioemocionales"
			},
			{
				name: "Toma de decisiones responsable",
				skill_category: "Habilidades Socioemocionales"
			},
			# {
			# 	name: "Desarrollo y Gestión",
			# 	skill_category: "Habilidades para la vida"
			# },
			# {
			# 	name: "Autocuidado",
			# 	skill_category: "Habilidades para la vida"
			# },
			# {
			# 	name: "Sentido de pertenencia",
			# 	skill_category: "Habilidades para la vida"
			# },
			# {
			# 	name: "Participación y Organización",
			# 	skill_category: "Habilidades para la vida"
			# },
			# {
			# 	name: "Comprensión del otro y del entorno",
			# 	skill_category: "Habilidades para la vida"
			# },
			# {
			# 	name: "Relación con los otros y el entorno",
			# 	skill_category: "Habilidades para la vida"
			# }
		]

		Skill.destroy_all

		skills.each do |sk|
			s = Skill.find_or_create_by sk
			puts s.inspect
		end

	end

end