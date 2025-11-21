package eu.consilium.core.model.entity.consulting;

import eu.consilium.core.model.entity.UserEntity;
import eu.consilium.core.model.enums.ConsultingCategory;
import eu.consilium.core.model.enums.ConsultingStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "consulting_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsultingRequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "requester_id", nullable = false)
    private UserEntity requester;

    @ManyToOne
    @JoinColumn(name = "consultant_id")
    private UserEntity consultant;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConsultingCategory category;

    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConsultingStatus status;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}