# rake load:skills
namespace :load do

	task :skills => :environment do

		skills = [
			{
				skill_category: "Autoconciencia",
				name: "Reconocimiento de emociones"
			},
			{
				skill_category: "Autoconciencia",
				name: "Reconocimiento de intereses, valores y habilidades"
			},
			{
				skill_category: "Autoconciencia",
				name: "Autovaloración"
			},
			{
				skill_category: "Autoconciencia",
				name: "Autoconocimiento"
			},
			{
				skill_category: "Autogestión",
				name: "Autocontrol, manejo de impulso y conducta"
			},
			{
				skill_category: "Autogestión",
				name: "Manejo y expresión adecuada de emociones"
			},
			{
				skill_category: "Autogestión",
				name: "Automotivación, logro de metas personales"
			},
			{
				skill_category: "Conciencia del otro",
				name: "Empatía"
			},
			{
				skill_category: "Conciencia del otro",
				name: "Toma de perspectiva"
			},
			{
				skill_category: "Habilidades sociales",
				name: "Establecer y mantener relaciones sanas y gratificantes"
			},
			{
				skill_category: "Habilidades sociales",
				name: "Trabajo en equipo, cooperación"
			},
			{
				skill_category: "Habilidades sociales",
				name: "Diálogo y participación"
			},
			{
				skill_category: "Habilidades sociales",
				name: "Comunicación asertiva"
			},
			{
				skill_category: "Habilidades sociales",
				name: "Resolución pacifica de conflictos"
			},
			{
				skill_category: "Toma de decisiones responsables",
				name: "Razonamiento moral"
			},
			{
				skill_category: "Toma de decisiones responsables",
				name: "Toma de decisiones responsables"
			}
		]

		Skill.destroy_all

		skills.each do |sk|
			s = Skill.find_or_create_by sk
			puts s.inspect
		end

	end

end

# 1 - Autoconciencia
# 	- Reconocimiento de emociones
# 	- Reconocimiento de intereses
# 	- Autovaloración
#	- Autoconocimiento
# 2 - Autogestion
# 	- Autocontrol, manejo de impulso y conducta
# 	- Manejo y expresion adecuada de emociones
# 	- Automotivación, logro de metas personales
# 3 - Conciencia del otro
# 	- Empatía
# 	- Toma de perspectiva
# 4 - Habilidades sociales
# 	- Establecer y mantener relaciones sanas y gratificantes
# 	- Trabajo en equipo, cooperación
# 	- Dialogo y participación
# 	- Comunicación asertiva
# 	- Resolución pacifica de conflictos
# 5 - Toma de decisiones responsables
# 	- Razonamiento moral
# 	- Toma de decisiones responsables

