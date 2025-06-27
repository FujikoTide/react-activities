import ProfileCard, { type ProfileCardProps } from '../components/ProfileCard'
import person1 from '../assets/images/person1.jpg'
import person2 from '../assets/images/person5.jpg'
import person3 from '../assets/images/person3.jpg'

const profiles: ProfileCardProps[] = [
  {
    image: person1,
    name: 'Harold Finch',
    company: 'Big Data Inc.',
    jobTitle: 'President',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptas rerum error, unde reiciendis quisquam, porro ex at nihil labore debitis doloribus delectus earum quas.',
    skills: ['Database Management', 'Data Analysis'],
  },
  {
    image: person2,
    name: 'Isabella Thomas',
    company: 'Vortex Dynamics',
    jobTitle: 'Network Engineer',
    bio: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam quidem, rem voluptates, minima delectus et nobis unde deserunt consequuntur inventore eveniet. Nostrum, laborum nemo? Nisi.',
    skills: [
      'TCP/IP Stack (Advanced)',
      'BGP (Border Gateway Protocol)',
      'Zero Trust Architecture',
    ],
  },
  {
    image: person3,
    name: 'Alexander Scott',
    company: 'Precision Works Ltd.',
    jobTitle: 'Engineer',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptate exercitationem quibusdam! Veniam distinctio, magnam architecto illo ipsum ut, non nesciunt tempora repudiandae, necessitatibus placeat.',
    skills: [
      'Computational Fluid Dynamics (CFD)',
      'Rapid Prototyping (3D Printing, CNC Machining)',
    ],
  },
]

function ProfileCards() {
  return (
    <div>
      {profiles.map((entry, index) => (
        <div className="flex flex-col items-center p-8">
          <ProfileCard key={index} {...entry} />
        </div>
      ))}
    </div>
  )
}

export default ProfileCards
