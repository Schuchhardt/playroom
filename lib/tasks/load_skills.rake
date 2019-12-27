# rake load:skills
namespace :load do

	task :skills => :environment do

		skills = [
			{
				skill_category: "1. Autoconciencia",
				name: "1. Reconocimiento de emociones"
			},
			{
				skill_category: "1. Autoconciencia",
				name: "2. Reconocimiento de intereses, valores y habilidades"
			},
			{
				skill_category: "1. Autoconciencia",
				name: "3. Autovaloración"
			},
			{
				skill_category: "1. Autoconciencia",
				name: "4. Autoconocimiento"
			},
			{
				skill_category: "2. Autogestión",
				name: "1. Autocontrol, manejo de impulso y conducta"
			},
			{
				skill_category: "2. Autogestión",
				name: "2. Manejo y expresión adecuada de emociones"
			},
			{
				skill_category: "2. Autogestión",
				name: "3. Automotivación, logro de metas personales"
			},
			{
				skill_category: "3. Conciencia del otro",
				name: "1. Empatía"
			},
			{
				skill_category: "3. Conciencia del otro",
				name: "2. Toma de perspectiva"
			},
			{
				skill_category: "4. Habilidades sociales",
				name: "1. Establecer y mantener relaciones sanas y gratificantes"
			},
			{
				skill_category: "4. Habilidades sociales",
				name: "2. Trabajo en equipo, cooperación"
			},
			{
				skill_category: "4. Habilidades sociales",
				name: "3. Diálogo y participación"
			},
			{
				skill_category: "4. Habilidades sociales",
				name: "4. Comunicación asertiva"
			},
			{
				skill_category: "4. Habilidades sociales",
				name: "5. Resolución pacifica de conflictos"
			},
			{
				skill_category: "5. Toma de decisiones responsables",
				name: "1. Razonamiento moral"
			},
			{
				skill_category: "5. Toma de decisiones responsables",
				name: "2. Toma de decisiones responsables"
			},
			{
				skill_category: "Habilidades del siglo XXI",
				name: "Pensamiento critico"
			},
			{
				skill_category: "Habilidades del siglo XXI",
				name: "Creatividad"
			},
			{
				skill_category: "Habilidades del siglo XXI",
				name: "Curiosidad"
			},
			{
				skill_category: "Habilidades del siglo XXI",
				name: "Trabajo en equipo (Colaboración)"
			},
		
			{
				skill_category: "Habilidades del siglo XXI",
				name: "Comunicación"
			},
			{
				skill_category: "Habilidades del siglo XXI",
				name: "Aprender a aprender"
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

# Habilidades del siglo XXI

# Pensamiento critico
# Creatividad
# Curiosidad
# Trabajo en equipo (Colaboración)
# Comunicación
# Aprender a aprender



