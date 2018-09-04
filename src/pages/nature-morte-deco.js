import React, { Component } from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'

class NatureMorteDeco extends Component {
  render() {
    const posts = this.props.data.allContentfulGallery.edges

    return (
      <div>
        <Helmet>
          <title>
            Nature Morte | Déco - JEAN EMMANUEL RODE Photographe LILLE
          </title>
          <meta
            name='description'
            content='La Photographie de Nature Morte et de décoration par JEAN EMMANUEL RODE Photographe LILLE'
          />
          <meta
            property='og:title'
            content='Nature Morte | Déco - JEAN EMMANUEL RODE Photographe LILLE'
          />
          <meta property='og:image' content={posts[0].node.cover.sizes.src} />
          <meta property='og:image:width' content='1800' />
          <meta property='og:image:height' content='1200' />
          <meta
            property='og:url'
            content='https://www.jeanemmanuelrode.com/nature-morte-deco'
          />
        </Helmet>

        <div className='category-navigation'>
          <h2>Galeries</h2>
          <ul className='category-navigation__links'>
            <li>
              <Link to='/galeries/'>All</Link>
            </li>
            <li>
              <Link to='/culinaire-sucre/'>Culinaire sucré</Link>
            </li>
            <li>
              <Link to='/culinaire-sale/'>Culinaire salé</Link>
            </li>
            <li>
              <Link to='/nature-morte-deco/' className='active'>
                Nature Morte | Déco
              </Link>
            </li>
            <li>
              <Link to='/spectacle/'>Spectacle</Link>
            </li>
            <li>
              <Link to='/metiers/'>Métiers</Link>
            </li>
            <li>
              <Link to='/institutionnel/'>Institutionnel</Link>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            {posts.map(({ node: post, index }) => (
              <li key={post.id} className='thumbnail-container'>
                <h2>{post.title}</h2>
                <Link to={'/' + post.slug + '/'}>
                  <div className='thumbnail-images'>
                    {post.images &&
                      post.images.map((images, index) => (
                        <div key={index} className='cell--fifth'>
                          <Img sizes={post.images[index].sizes} />
                        </div>
                      ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export const query = graphql`
  query NatureMorteDecoQuery {
    allContentfulGallery(
      filter: {
        node_locale: { eq: "fr-FR" }
        category: { name: { eq: "Nature Morte / déco" } }
      }
      limit: 1000
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          title
          id
          slug
          date
          category {
            name
            categorySlug
          }
          images {
            title
            description
            sizes(maxWidth: 1800) {
              ...GatsbyContentfulSizes_noBase64
            }
          }
          cover {
            title
            sizes(maxWidth: 1920) {
              ...GatsbyContentfulSizes_noBase64
            }
          }
        }
      }
    }
  }
`
export default NatureMorteDeco
