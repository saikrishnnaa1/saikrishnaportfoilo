//import gsap from "gsap"
//import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

class PortfolioApp {
  constructor() {
    this.init()
  }

  init() {
    this.setupGSAP()
    this.setupCursor()
    this.setupParticles()
    this.setupMagneticButtons()
    this.setupLoadingScreen()
    this.setupNavigation()
    this.setupFormHandling()
  }

  // GSAP Setup
  setupGSAP() {
    if (typeof gsap !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
      gsap.ticker.lagSmoothing(0)
    }
  }

  // Custom Cursor
  setupCursor() {
    if (window.innerWidth <= 768) return // Skip on mobile

    this.cursor = document.querySelector(".cursor")
    this.cursorDot = document.querySelector(".cursor-dot")
    this.cursorOutline = document.querySelector(".cursor-outline")

    if (!this.cursor) return

    let mouseX = 0,
      mouseY = 0
    let outlineX = 0,
      outlineY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    // Smooth cursor animation
    const animateCursor = () => {
      outlineX += (mouseX - outlineX) * 0.1
      outlineY += (mouseY - outlineY) * 0.1

      this.cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      this.cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`

      requestAnimationFrame(animateCursor)
    }
    animateCursor()

    // Cursor interactions
    document.querySelectorAll(".magnetic-btn, a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.cursorOutline.style.transform += " scale(1.5)"
        this.cursorOutline.style.borderColor = "#00ffff"
      })

      el.addEventListener("mouseleave", () => {
        this.cursorOutline.style.transform = this.cursorOutline.style.transform.replace(" scale(1.5)", "")
        this.cursorOutline.style.borderColor = "rgba(0, 255, 255, 0.3)"
      })
    })
  }

  // Optimized Particle Systems
  setupParticles() {
    this.setupParticleCanvas()
    this.setupNeuralNetwork()
    this.setupCodeRain()
    this.setupSkillParticles()
    this.setupContactParticles()
  }

  setupParticleCanvas() {
    const canvas = document.getElementById("particleCanvas")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 25 // Reduced from 50

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3 // Reduced speed
        this.vy = (Math.random() - 0.5) * 0.3
        this.size = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.3 + 0.1 // Reduced opacity
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = "#00ffff"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    let lastTime = 0
    const targetFPS = 30 // Reduced from 60

    // Optimized animation loop
    const animate = (currentTime) => {
      if (currentTime - lastTime >= 1000 / targetFPS) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle) => {
          particle.update()
          particle.draw()
        })

        // Reduced connection drawing
        particles.forEach((particle, i) => {
          if (i % 2 === 0) {
            // Only check every other particle
            particles.slice(i + 1).forEach((otherParticle) => {
              const dx = particle.x - otherParticle.x
              const dy = particle.y - otherParticle.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 80) {
                // Reduced from 100
                ctx.save()
                ctx.globalAlpha = ((80 - distance) / 80) * 0.1 // Reduced opacity
                ctx.strokeStyle = "#00ffff"
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(otherParticle.x, otherParticle.y)
                ctx.stroke()
                ctx.restore()
              }
            })
          }
        })

        lastTime = currentTime
      }

      requestAnimationFrame(animate)
    }
    animate()

    // Resize handler
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }

  setupNeuralNetwork() {
    const canvas = document.getElementById("neuralCanvas")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const nodes = []
    const nodeCount = 15 // Reduced from 30

    class Node {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.2 // Reduced speed
        this.vy = (Math.random() - 0.5) * 0.2
        this.size = Math.random() * 2 + 1
        this.pulse = Math.random() * Math.PI * 2
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.pulse += 0.01 // Reduced pulse speed

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        const pulseSize = this.size + Math.sin(this.pulse) * 0.5

        ctx.save()
        ctx.fillStyle = "#00ffff"
        ctx.shadowBlur = 5 // Reduced blur
        ctx.shadowColor = "#00ffff"
        ctx.globalAlpha = 0.6
        ctx.beginPath()
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node())
    }

    let lastTime = 0
    const targetFPS = 30

    const animate = (currentTime) => {
      if (currentTime - lastTime >= 1000 / targetFPS) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        nodes.forEach((node) => {
          node.update()
          node.draw()
        })

        // Reduced neural connections
        nodes.forEach((node, i) => {
          if (i % 2 === 0) {
            nodes.slice(i + 1).forEach((otherNode) => {
              const dx = node.x - otherNode.x
              const dy = node.y - otherNode.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 100) {
                // Reduced from 150
                ctx.save()
                ctx.globalAlpha = ((100 - distance) / 100) * 0.2
                ctx.strokeStyle = "#00ffff"
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(node.x, node.y)
                ctx.lineTo(otherNode.x, otherNode.y)
                ctx.stroke()
                ctx.restore()
              }
            })
          }
        })

        lastTime = currentTime
      }

      requestAnimationFrame(animate)
    }
    animate()
  }

  setupCodeRain() {
    const canvas = document.getElementById("codeCanvas")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const columns = Math.floor(canvas.width / 25) // Increased spacing
    const drops = Array(columns).fill(1)
    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]()"

    let lastTime = 0
    const targetFPS = 15 // Much slower for code rain

    const animate = (currentTime) => {
      if (currentTime - lastTime >= 1000 / targetFPS) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)" // Increased fade
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "#ff00ff"
        ctx.font = "12px JetBrains Mono"
        ctx.globalAlpha = 0.7

        drops.forEach((y, i) => {
          const char = chars[Math.floor(Math.random() * chars.length)]
          const x = i * 25

          ctx.fillText(char, x, y * 25)

          if (y * 25 > canvas.height && Math.random() > 0.98) {
            drops[i] = 0
          }
          drops[i]++
        })

        lastTime = currentTime
      }

      requestAnimationFrame(animate)
    }
    animate()
  }

  setupSkillParticles() {
    const canvas = document.getElementById("skillCanvas")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = []
    const particleCount = 20 // Reduced from 40

    class SkillParticle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.2 // Reduced speed
        this.vy = (Math.random() - 0.5) * 0.2
        this.size = Math.random() * 1.5 + 0.5
        this.color = ["#00ffff", "#ff00ff", "#ffff00"][Math.floor(Math.random() * 3)]
        this.pulse = Math.random() * Math.PI * 2
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.pulse += 0.02

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        const pulseSize = this.size + Math.sin(this.pulse) * 0.3

        ctx.save()
        ctx.fillStyle = this.color
        ctx.shadowBlur = 3
        ctx.shadowColor = this.color
        ctx.globalAlpha = 0.5
        ctx.beginPath()
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new SkillParticle())
    }

    let lastTime = 0
    const targetFPS = 30

    const animate = (currentTime) => {
      if (currentTime - lastTime >= 1000 / targetFPS) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle) => {
          particle.update()
          particle.draw()
        })

        lastTime = currentTime
      }

      requestAnimationFrame(animate)
    }
    animate()
  }

  setupContactParticles() {
    const canvas = document.getElementById("contactCanvas")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = []
    const particleCount = 15 // Reduced from 35

    class ContactParticle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.2
        this.vy = (Math.random() - 0.5) * 0.2
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.3 + 0.2
        this.pulse = Math.random() * Math.PI * 2
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.pulse += 0.015

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        const pulseOpacity = this.opacity + Math.sin(this.pulse) * 0.1

        ctx.save()
        ctx.globalAlpha = pulseOpacity
        ctx.fillStyle = "#ff00ff"
        ctx.shadowBlur = 4
        ctx.shadowColor = "#ff00ff"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new ContactParticle())
    }

    let lastTime = 0
    const targetFPS = 30

    const animate = (currentTime) => {
      if (currentTime - lastTime >= 1000 / targetFPS) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle) => {
          particle.update()
          particle.draw()
        })

        lastTime = currentTime
      }

      requestAnimationFrame(animate)
    }
    animate()
  }

  // Magnetic Button Effects
  setupMagneticButtons() {
    document.querySelectorAll(".magnetic-btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        const distance = Math.sqrt(x * x + y * y)
        const maxDistance = 30 // Reduced from 50

        if (distance < maxDistance) {
          const strength = (maxDistance - distance) / maxDistance
          const moveX = x * strength * 0.2 // Reduced strength
          const moveY = y * strength * 0.2

          if (typeof gsap !== "undefined") {
            gsap.to(btn, {
              x: moveX,
              y: moveY,
              duration: 0.3,
              ease: "power2.out",
            })
          } else {
            btn.style.transform = `translate(${moveX}px, ${moveY}px)`
          }
        }
      })

      btn.addEventListener("mouseleave", () => {
        if (typeof gsap !== "undefined") {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          })
        } else {
          btn.style.transform = "translate(0px, 0px)"
        }
      })
    })
  }

  // Fixed Loading Screen
  setupLoadingScreen() {
    const loader = document.querySelector(".loader")
    const progressBar = document.querySelector(".progress-bar")
    const percentage = document.querySelector(".loading-percentage")

    if (!loader || !progressBar || !percentage) return

    let progress = 0
    const duration = 2000 // 2 seconds
    const interval = 50 // Update every 50ms
    const increment = 100 / (duration / interval)

    const progressInterval = setInterval(() => {
      progress += increment + Math.random() * 3 // Add some randomness
      if (progress > 100) progress = 100

      progressBar.style.width = progress + "%"
      percentage.textContent = Math.floor(progress) + "%"

      if (progress >= 100) {
        clearInterval(progressInterval)
        setTimeout(() => {
          if (typeof gsap !== "undefined") {
            gsap.to(loader, {
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
              onComplete: () => {
                loader.style.display = "none"
                this.initMainAnimations()
              },
            })
          } else {
            loader.style.opacity = "0"
            setTimeout(() => {
              loader.style.display = "none"
              this.initMainAnimations()
            }, 1000)
          }
        }, 300)
      }
    }, interval)
  }

  // Navigation
  setupNavigation() {
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")
    const navLinks = document.querySelectorAll(".nav-link")

    hamburger?.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }

        hamburger?.classList.remove("active")
        navMenu?.classList.remove("active")
      })
    })

    // Active nav highlighting
    const sections = document.querySelectorAll("section")
    window.addEventListener("scroll", () => {
      let current = ""
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  }

  // Main Animations
  initMainAnimations() {
    this.setupHeroAnimations()
    this.setupScrollAnimations()
    this.setupSkillBars()
    this.setupCounters()
    this.setupRevealAnimations()
  }

  setupHeroAnimations() {
    if (typeof gsap === "undefined") {
      // Fallback animations without GSAP
      const elements = document.querySelectorAll(
        ".hero-title .word, .hero-description, .hero-buttons .btn, .floating-card-3d, .social-orbs .social-orb",
      )
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }, index * 100)
      })
      return
    }

    const tl = gsap.timeline()

    tl.from(".hero-title .word", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    })
      .from(
        ".hero-description",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5",
      )
      .from(
        ".hero-buttons .btn",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.3",
      )
      .from(
        ".floating-card-3d",
        {
          scale: 0.8,
          opacity: 0,
          rotationY: -45,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        "-=0.8",
      )
      .from(
        ".social-orbs .social-orb",
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      )
  }

  setupScrollAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return

    // Parallax effects
    gsap.to(".floating-orbs", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: -100, // Reduced movement
      ease: "none",
    })

    // Section animations
    gsap.utils.toArray("section").forEach((section) => {
      gsap.from(section.querySelectorAll(".reveal-text"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 30, // Reduced movement
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      })
    })

    // Timeline animations
    gsap.utils.toArray(".timeline-item").forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.05,
        ease: "power2.out",
      })
    })

    // Project cards
    gsap.utils.toArray(".project-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
      })
    })
  }

  setupSkillBars() {
    if (typeof gsap === "undefined") {
      // Fallback without GSAP
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target
            const width = bar.getAttribute("data-width")
            setTimeout(() => {
              bar.style.width = width + "%"
            }, 500)
          }
        })
      })

      document.querySelectorAll(".skill-progress").forEach((bar) => {
        observer.observe(bar)
      })
      return
    }

    gsap.utils.toArray(".skill-progress").forEach((bar) => {
      const width = bar.getAttribute("data-width")
      gsap.to(bar, {
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        width: width + "%",
        duration: 1.2,
        ease: "power2.out",
      })
    })
  }

  setupCounters() {
    if (typeof gsap === "undefined") {
      // Fallback without GSAP
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target
            const target = Number.parseFloat(counter.getAttribute("data-target"))
            let current = 0
            const increment = target / 100
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              if (target > 10) {
                counter.textContent = Math.floor(current) + "+"
              } else {
                counter.textContent = current.toFixed(1)
              }
            }, 20)
          }
        })
      })

      document.querySelectorAll(".counter").forEach((counter) => {
        observer.observe(counter)
      })
      return
    }

    gsap.utils.toArray(".counter").forEach((counter) => {
      const target = Number.parseFloat(counter.getAttribute("data-target"))
      gsap.fromTo(
        counter,
        { textContent: 0 },
        {
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          textContent: target,
          duration: 1.5,
          ease: "power2.out",
          snap: { textContent: target > 10 ? 1 : 0.1 },
          onUpdate: function () {
            const current = Number.parseFloat(this.targets()[0].textContent)
            if (target > 10) {
              counter.textContent = Math.floor(current) + "+"
            } else {
              counter.textContent = current.toFixed(1)
            }
          },
        },
      )
    })
  }

  setupRevealAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    document.querySelectorAll(".reveal-text").forEach((el) => {
      observer.observe(el)
    })
  }

  // Form Handling
  setupFormHandling() {
    const form = document.getElementById("contactForm")
    if (!form) return

    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(form)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const message = formData.get("message")

      if (!name || !email || !subject || !message) {
        this.showNotification("Please fill in all fields", "error")
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        this.showNotification("Please enter a valid email address", "error")
        return
      }

      const submitBtn = form.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitBtn.disabled = true

      setTimeout(() => {
        this.showNotification("Message sent successfully! I'll get back to you soon.", "success")
        form.reset()
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Notification System
  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
                <span>${message}</span>
            </div>
        `

    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${
              type === "success"
                ? "linear-gradient(135deg, #00ffff, #00ff00)"
                : type === "error"
                  ? "linear-gradient(135deg, #ff0040, #ff6b6b)"
                  : "linear-gradient(135deg, #00ffff, #ff00ff)"
            };
            color: ${type === "success" || type === "error" ? "#000" : "#fff"};
            padding: 15px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
        `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    setTimeout(() => {
      notification.style.transform = "translateX(400px)"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 5000)
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp()
})

// Handle resize events
window.addEventListener("resize", () => {
  // Resize canvas elements
  const canvases = ["particleCanvas", "neuralCanvas", "codeCanvas", "skillCanvas", "contactCanvas"]
  canvases.forEach((id) => {
    const canvas = document.getElementById(id)
    if (canvas) {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
  })
})

console.log("🚀 Optimized Futuristic Portfolio loaded successfully!")
