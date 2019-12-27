# rake load:idps
namespace :load do

	task :idps => :environment do

		idps = [
            {
                name: "Autoestima académica y motivación escolar"
            },
            {
                name: "Asistencia escolar"
            },
            {
                name: "Retención escolar"
            },
            {
                name: "Equidad de genero"
            },
            {
                name: "Participación y formación ciudadana"
            },
            {
                name: "Clima de convivencia escolar"
            },
            {
                name: "Habitos de vida saludable"
            },
            {
                name: "Titulacion técnico-profesional"
            }
		]

		Idp.destroy_all

		idps.each do |sk|
			s = Idp.find_or_create_by sk
			puts s.inspect
		end

	end

end

